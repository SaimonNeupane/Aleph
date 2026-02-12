# webcrawler/items.py
import scrapy


class PageItem(scrapy.Item):
    url = scrapy.Field()
    title = scrapy.Field()
    content = scrapy.Field()
    # We don't strictly need 'crawled_at' or 'search_vector' here
    # because the Django model defaults/methods handle those.
