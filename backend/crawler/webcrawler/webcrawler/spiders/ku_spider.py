import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from webcrawler.items import PageItem


class KUSpider(CrawlSpider):
    name = "np_spider"
    allowed_domains = ["np"]

    start_urls = [
        "https://ku.edu.np/",
        "https://tu.edu.np/",
        "https://mofa.gov.np/",
    ]

    rules = (
        Rule(
            LinkExtractor(
                allow=r"https?://([^/]+\.)*np(/|$)",
                deny=(
                    r"/.*\.(pdf|jpg|jpeg|png|gif|zip|rar|exe|dmg|css|js)$",
                    r"/wp-admin/",
                    r"/wp-content/",
                    r"/login",
                ),
            ),
            callback="parse_page",
            follow=True,
        ),
    )

    def parse_page(self, response):
        item = PageItem()
        item["url"] = response.url
        item["title"] = (
            response.xpath("//title/text()").get(default=response.url).strip()
        )

        text_nodes = response.xpath("//body//text()").getall()
        clean_text = " ".join([text.strip() for text in text_nodes if text.strip()])
        item["content"] = clean_text

        yield item


if __name__ == "__main__":
    import os
    import sys
    from scrapy.crawler import CrawlerProcess
    from scrapy.utils.project import get_project_settings
    import django

    print(" Starting Spider...")
    django.setup()
    os.environ.setdefault("SCRAPY_SETTINGS_MODULE", "webcrawler.settings")
    process = CrawlerProcess(get_project_settings())
    process.crawl(KUSpider)
    process.start()
