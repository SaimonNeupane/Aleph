import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from webcrawler.items import PageItem
from urllib.parse import urljoin, urlparse
from datetime import datetime


class KUSpider(CrawlSpider):
    name = "ku_spider"

    allowed_domains = ["ku.edu.np", "reddit.com"]
    start_urls = [
        "https://ku.edu.np/",
        "https://www.reddit.com/r/KathmanduUniversity/",
    ]

    # Define rules for following links
    rules = (
        Rule(
            LinkExtractor(
                allow_domains=allowed_domains,
                deny=(
                    r"/.*\.(pdf|jpg|jpeg|png|gif|zip|rar|exe|dmg)$",  # Skip binary files
                    r"/wp-admin/",  # Skip admin pages
                    r"/wp-content/",  # Skip static content
                ),
            ),
            callback="parse_page",
            follow=True,
        ),
    )

    def parse_page(self, response):
        """Parse each page and extract content and links"""

        # Extract text content
        content = " ".join(response.xpath("//body//text()").getall())
        content = " ".join(content.split())  # Normalize whitespace

        # Extract all links on the page
        links = []
        for link in response.xpath("//a/@href").getall():
            absolute_url = urljoin(response.url, link)
            parsed = urlparse(absolute_url)

            # Only keep links from allowed domains
            if any(domain in parsed.netloc for domain in self.allowed_domains):
                links.append(absolute_url)

        # Create and yield item
        item = PageItem()
        item["url"] = response.url
        item["content"] = content
        item["links"] = list(set(links))  # Remove duplicates
        item["crawled_at"] = datetime.now()

        yield item
