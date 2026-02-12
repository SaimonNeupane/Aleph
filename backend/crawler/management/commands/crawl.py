from django.core.management.base import BaseCommand
from django.utils import timezone  # Needed for last_crawled
from asgiref.sync import sync_to_async
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.http import HtmlResponse

# Import your model
from api.models import WebPage


class Command(BaseCommand):
    help = "Runs the single-file Scrapy spider"

    def handle(self, *args, **options):
        # 1. Define Settings
        custom_settings = {
            "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "ROBOTSTXT_OBEY": False,
            "CONCURRENT_REQUESTS": 16,
            "DOWNLOAD_DELAY": 0.5,
            "COOKIES_ENABLED": False,
            "LOG_LEVEL": "INFO",
        }

        self.stdout.write("🚀 Initializing Fixed Spider...")

        process = CrawlerProcess(custom_settings)
        process.crawl(MonolithicSpider)
        process.start()

        self.stdout.write(self.style.SUCCESS("✅ Crawl Finished!"))


class MonolithicSpider(CrawlSpider):
    name = "mono_spider"
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
                # FILTER: Aggressively deny binary files and download links
                deny=(
                    r"\.(pdf|jpg|jpeg|png|gif|zip|rar|exe|dmg|css|js|docx|doc|xls|xlsx|ppt)$",
                    r"/wp-admin/",
                    r"/login",
                    r"/file-access/",
                    r"/get_file_by_token/",
                    r"/downloads",
                ),
            ),
            callback="parse_page",
            follow=True,
        ),
    )

    # --- ASYNC PARSE METHOD ---
    # We make this async so we can await the DB save without blocking Scrapy
    async def parse_page(self, response):
        # CHECK: Ensure we only parse HTML (Avoids "NotSupported" error on PDFs)
        if not isinstance(response, HtmlResponse):
            return

        url = response.url
        try:
            title = response.xpath("//title/text()").get(default=url).strip()
        except:
            title = url

        # Extract Clean Content
        text_nodes = response.xpath("//body//text()").getall()
        content = " ".join([text.strip() for text in text_nodes if text.strip()])

        # --- SAFE DATABASE SAVING ---
        # We wrap the sync DB call in sync_to_async
        try:
            await sync_to_async(self.save_to_db)(url, title, content)
            # print(f"  [+] Saved: {url}") # Uncomment for verbose logging
        except Exception as e:
            print(f"  [!] Error saving {url}: {e}")

    # Helper method for the actual DB write
    def save_to_db(self, url, title, content):
        # Note: We do NOT pass content_hash here.
        # Your model's save() method automatically generates it from 'content'.
        WebPage.objects.update_or_create(
            url=url,
            defaults={
                "title": title,
                "content": content,
                "last_crawled": timezone.now(),  # Update timestamp on re-crawl
            },
        )
