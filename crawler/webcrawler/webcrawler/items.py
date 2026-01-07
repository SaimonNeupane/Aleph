import scrapy


class PageItem(scrapy.Item):
    url = scrapy.Field()
    content = scrapy.Field()  # Raw text content
    links = scrapy.Field()  # List of outgoing links
    crawled_at = scrapy.Field()
