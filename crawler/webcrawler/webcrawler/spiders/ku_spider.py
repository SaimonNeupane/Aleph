import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from webcrawler.items import PageItem
from urllib.parse import urljoin, urlparse
from datetime import datetime


class KUSpider(CrawlSpider):
    name = "np_spider"

    # IMPORTANT: only base TLD, not specific sites
    allowed_domains = ["np"]

    start_urls = [
        "https://nepal.gov.np/",
        "https://gov.np/",
        "https://edu.np/",
        "https://tu.edu.np/",
        "https://ku.edu.np/",
    ]

    rules = (
        Rule(
            LinkExtractor(
                allow=r"https?://([^/]+\.)*np(/|$)",
                deny=(
                    r"/.*\.(pdf|jpg|jpeg|png|gif|zip|rar|exe|dmg)$",
                    r"/wp-admin/",
                    r"/wp-content/",
                ),
            ),
            callback="parse_page",
            follow=True,
        ),
    )

    def is_np_domain(self, url: str) -> bool:
        hostname = urlparse(url).hostname
        return hostname is not None and hostname.endswith(".np")

    def parse_page(self, response):
        # Safety check after redirects
        if not self.is_np_domain(response.url):
            return

        # Extract visible text
        content = " ".join(response.xpath("//body//text()").getall())
        content = " ".join(content.split())

        links = []
        for href in response.xpath("//a/@href").getall():
            absolute_url = urljoin(response.url, href)
            if self.is_np_domain(absolute_url):
                links.append(absolute_url)

        item = PageItem()
        item["url"] = response.url
        item["content"] = content
        item["links"] = list(set(links))
        item["crawled_at"] = datetime.utcnow()

        yield item
