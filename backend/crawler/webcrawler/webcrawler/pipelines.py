import hashlib
from api.models import WebPage
from django.db import IntegrityError


class DjangoWriterPipeline:
    def process_item(self, item, spider):
        url = item["url"]
        content = item["content"]
        title = item.get("title", "")

        # 1. Calculate the hash of the INCOMING content
        new_content_hash = hashlib.sha256(content.encode("utf-8")).hexdigest()

        try:
            # 2. Check if this exact page (URL + Hash) already exists
            # We use .filter().exists() because it is extremely fast
            if WebPage.objects.filter(url=url, content_hash=new_content_hash).exists():
                spider.logger.info(f"Skipping duplicate (unchanged): {url}")
                return item

            # 3. If it's new or changed, update the DB
            # Note: We don't need to pass content_hash here because your
            # model's save() method will recalculate it anyway.
            page, created = WebPage.objects.update_or_create(
                url=url,
                defaults={
                    "title": title,
                    "content": content,
                },
            )

            if created:
                spider.logger.info(f"Created new page: {url}")
            else:
                spider.logger.info(f"Updated modified page: {url}")

        except IntegrityError as e:
            spider.logger.error(f"Integrity Error: {e}")
        except Exception as e:
            spider.logger.error(f"Error saving {url}: {e}")

        return item
