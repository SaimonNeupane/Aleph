from django.db import models
from django.contrib.postgres.search import SearchVector, SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.utils.timezone import now
import hashlib

# Create your models here.


class WebPage(models.Model):
    objects = models.Manager()
    title = models.CharField(max_length=1024)
    content = models.TextField()
    search_vector = SearchVectorField(null=True)
    url = models.TextField(unique=True)
    content_hash = models.CharField(max_length=64)
    last_crawled = models.DateTimeField(default=now)

    class Meta:
        indexes = [
            GinIndex(fields=["search_vector"]),
            models.Index(fields="content_hash", name="contetn-hash-index"),
        ]

    def save(self, *args, **kwargs):
        if self.content:
            self.content_hash = hashlib.sha256(self.content.encode("utf-8")).hexdigest()
        super().save(*args, **kwargs)
        WebPage.objects.filter(pk=self.pk).update(
            search_vector=(
                SearchVector("title", weight="A") + SearchVector("content", weight="B")
            )
        )
