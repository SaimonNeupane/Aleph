import psycopg
from datetime import datetime
from collections import Counter
import re
from urllib.parse import urljoin, urlparse
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords

# Initialize stemmer and stop words globally
stemmer = PorterStemmer()

# Try to load NLTK stopwords, fallback to manual list
try:
    STOP_WORDS = set(stopwords.words("english"))
except:
    print(
        "NLTK stopwords not found. Run: python3 -c \"import nltk; nltk.download('stopwords')\""
    )
    STOP_WORDS = {
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


class SearchEnginePipeline:
    def __init__(self):
        self.conn = None
        self.cursor = None

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
            # 1. Insert current page
            page_id = self._insert_page(item["url"], spider)

            if page_id is None:
                spider.logger.warning(
                    f"Skipping item due to page insertion failure: {item['url']}"
                )
                return item

            # 2. Extract and insert keywords with stemming
            keywords = self._extract_keywords(item["content"])
            self._insert_keywords(page_id, keywords, spider)

            # 3. Insert links (only to pages that already exist)
            self._insert_links(page_id, item["links"], spider)

            # Commit every 50 items for performance
            if page_id % 50 == 0:
                self.conn.commit()
                spider.logger.info(f"Committed batch. Processed page_id: {page_id}")

            return item

        except Exception as e:
            spider.logger.error(f"Error processing item {item['url']}: {e}")
            self.conn.rollback()
            return item

    def _insert_page(self, url, spider):
        """Insert page or return existing page_id"""
        try:
            self.cursor.execute(
                "INSERT INTO pages (url, crawled_at) VALUES (%s, %s) RETURNING id",
                (url, datetime.now()),
            )
            page_id = self.cursor.fetchone()[0]
            return page_id
        except psycopg.errors.UniqueViolation:
            # Page already exists, fetch its id
            self.conn.rollback()
            self.cursor.execute("SELECT id FROM pages WHERE url = %s", (url,))
            result = self.cursor.fetchone()
            if result:
                return result[0]
            else:
                spider.logger.error(f"Failed to get page_id for {url}")
                return None
        except Exception as e:
            spider.logger.error(f"Error inserting page {url}: {e}")
            self.conn.rollback()
            return None

    def _extract_keywords(self, content):
        """Extract keywords from content, stem them, and count frequencies"""
        if not content:
            return Counter()

        # Convert to lowercase and extract words (minimum 3 characters)
        words = re.findall(r"\b[a-z]{3,}\b", content.lower())

        # Filter stop words and stem each word
        stemmed_words = []
        for word in words:
            if word not in STOP_WORDS:
                try:
                    stemmed = stemmer.stem(word)
                    # Only keep stemmed words that are at least 2 chars
                    if len(stemmed) >= 2:
                        stemmed_words.append(stemmed)
                except Exception:
                    # If stemming fails for any reason, use original word
                    stemmed_words.append(word)

        return Counter(stemmed_words)

    def _normalize_keyword(self, keyword):
        """Normalize keyword (stem and lowercase)"""
        try:
            return stemmer.stem(keyword.lower().strip())
        except Exception:
            # Fallback if stemming fails
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
        """Insert links only to pages that already exist in database"""
        if not links or from_page_id is None:
            return

        # Get all URLs that already exist in the database
        try:
            self.cursor.execute(
                "SELECT id, url FROM pages WHERE url = ANY(%s)", (links,)
            )
            existing_pages = {url: page_id for page_id, url in self.cursor.fetchall()}

            # Only create links to pages that exist
            link_data = []
            for link_url in links:
                if link_url in existing_pages:
                    to_page_id = existing_pages[link_url]
                    if from_page_id != to_page_id:  # Avoid self-links
                        link_data.append((from_page_id, to_page_id))

            if link_data:
                self.cursor.executemany(
                    """
                    INSERT INTO links (from_page, to_page)
                    VALUES (%s, %s)
                    ON CONFLICT (from_page, to_page) DO NOTHING
                    """,
                    link_data,
                )
                spider.logger.debug(
                    f"Inserted {len(link_data)} links from page {from_page_id}"
                )

        except Exception as e:
            spider.logger.error(f"Error inserting links from page {from_page_id}: {e}")
            self.conn.rollback()
