import scrapy


class WebspiderSpider(scrapy.Spider):
    name = "webspider"
    allowed_domains = ["en.wikipedia.org"]
    start_urls = ["https://en.wikipedia.org/wiki/Anime"]

    def parse(self, response):
        pass
