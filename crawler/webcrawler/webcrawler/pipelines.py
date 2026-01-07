import psycopg
from datetime import datetime
from collections import Counter
import re
from urllib.parse import urljoin, urlparse


class SearchEnginePipeline:
    def __init__(self):
        self.conn = None
        self.cursor = None
        self.page_cache = {}  # Cache URL -> page_id mapping

    def open_spider(self, spider):
        """Connect to database when spider opens"""
        try:
            self.conn = psycopg.connect(
                host="localhost",
                dbname="search_engine",
                user="saimon",
                password="26494504",
                port="5432",
            )
            self.conn.autocommit = False  # Use transactions for performance
            self.cursor = self.conn.cursor()
            spider.logger.info("Database connection established")

            # Load existing pages into cache
            self.cursor.execute("SELECT id, url FROM pages")
            self.page_cache = {url: page_id for page_id, url in self.cursor.fetchall()}
            spider.logger.info(
                f"Loaded {len(self.page_cache)} existing pages into cache"
            )

        except Exception as e:
            spider.logger.error(f"Database connection failed: {e}")
            raise

    def close_spider(self, spider):
        """Close database connection when spider closes"""
        if self.conn:
            self.conn.commit()
            self.cursor.close()
            self.conn.close()
            spider.logger.info("Database connection closed")

    def process_item(self, item, spider):
        """Process each scraped item"""
        try:
            # 1. Insert/get page
            page_id = self._insert_page(item["url"], spider)

            # 2. Extract and insert keywords
            keywords = self._extract_keywords(item["content"])
            self._insert_keywords(page_id, keywords, spider)

            # 3. Insert links
            self._insert_links(page_id, item["links"], spider)

            # Commit every 100 items for performance
            if len(self.page_cache) % 100 == 0:
                self.conn.commit()
                spider.logger.info(
                    f"Committed batch. Total pages: {len(self.page_cache)}"
                )

            return item

        except Exception as e:
            spider.logger.error(f"Error processing item {item['url']}: {e}")
            self.conn.rollback()
            return item

    def _insert_page(self, url, spider):
        """Insert page or return existing page_id"""
        if url in self.page_cache:
            return self.page_cache[url]

        try:
            self.cursor.execute(
                "INSERT INTO pages (url, crawled_at) VALUES (%s, %s) RETURNING id",
                (url, datetime.now()),
            )
            page_id = self.cursor.fetchone()[0]
            self.page_cache[url] = page_id
            return page_id
        except psycopg.errors.UniqueViolation:
            # Page already exists, fetch its id
            self.conn.rollback()
            self.cursor.execute("SELECT id FROM pages WHERE url = %s", (url,))
            page_id = self.cursor.fetchone()[0]
            self.page_cache[url] = page_id
            return page_id

    def _extract_keywords(self, content):
        """Extract keywords from content and count frequencies"""
        if not content:
            return Counter()

        # Convert to lowercase and extract words
        words = re.findall(r"\b[a-z]{3,}\b", content.lower())

        # Filter out common stop words
        stop_words = {
            "the",
            "and",
            "for",
            "are",
            "but",
            "not",
            "you",
            "all",
            "can",
            "her",
            "was",
            "one",
            "our",
            "out",
            "day",
            "get",
            "has",
            "him",
            "his",
            "how",
            "man",
            "new",
            "now",
            "old",
            "see",
            "two",
            "way",
            "who",
            "boy",
            "did",
            "its",
            "let",
            "put",
            "say",
            "she",
            "too",
            "use",
            "this",
            "that",
            "with",
            "have",
            "from",
            "they",
            "been",
            "will",
            "more",
            "when",
            "your",
            "said",
            "each",
            "than",
            "them",
            "about",
            "would",
            "there",
            "their",
            "which",
            "could",
            "other",
            "into",
            "were",
            "then",
            "these",
            "some",
            "time",
            "very",
            "what",
        }

        filtered_words = [w for w in words if w not in stop_words]
        return Counter(filtered_words)

    def _normalize_keyword(self, keyword):
        """Normalize keyword (lowercase, strip, etc.)"""
        return keyword.lower().strip()

    def _insert_keywords(self, page_id, keyword_counts, spider):
        """Insert keywords and page_keywords relationships"""
        if not keyword_counts:
            return

        for keyword, frequency in keyword_counts.items():
            norm_keyword = self._normalize_keyword(keyword)

            try:
                # Insert keyword if not exists
                self.cursor.execute(
                    """
                    INSERT INTO keywords (keyword, norm_keyword) 
                    VALUES (%s, %s) 
                    ON CONFLICT (norm_keyword) DO NOTHING
                    RETURNING id
                    """,
                    (keyword, norm_keyword),
                )
                result = self.cursor.fetchone()

                if result:
                    keyword_id = result[0]
                else:
                    # Keyword already exists, fetch its id
                    self.cursor.execute(
                        "SELECT id FROM keywords WHERE norm_keyword = %s",
                        (norm_keyword,),
                    )
                    keyword_id = self.cursor.fetchone()[0]

                # Insert page_keyword relationship
                self.cursor.execute(
                    """
                    INSERT INTO page_keywords (keyword_id, page_id, frequency)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (keyword_id, page_id) 
                    DO UPDATE SET frequency = page_keywords.frequency + EXCLUDED.frequency
                    """,
                    (keyword_id, page_id, frequency),
                )

            except Exception as e:
                spider.logger.error(f"Error inserting keyword '{keyword}': {e}")
                continue

    def _insert_links(self, from_page_id, links, spider):
        """Insert links between pages"""
        if not links:
            return

        link_data = []
        for link_url in links:
            # Get or create the target page
            to_page_id = self._insert_page(link_url, spider)

            if from_page_id != to_page_id:  # Avoid self-links
                link_data.append((from_page_id, to_page_id))

        if link_data:
            try:
                # Use executemany for batch insert (psycopg3 way)
                self.cursor.executemany(
                    """
                    INSERT INTO links (from_page, to_page)
                    VALUES (%s, %s)
                    ON CONFLICT (from_page, to_page) DO NOTHING
                    """,
                    link_data,
                )
            except Exception as e:
                spider.logger.error(f"Error inserting links: {e}")
