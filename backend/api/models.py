from django.db import models
from django.contrib.postgres.search import SearchVector, SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.utils.timezone import now

# Create your models here.


class WebPage(models.Model):
    title = models.CharField(max_length=1024)
    content = models.TextField()
    search_vector = SearchVectorField(null=True)
    url = models.TextField(unique=True)
    content_hash = models.CharField(max_length=64)
    last_crawled = models.DateTimeField(default=now)

    class Meta:
        indexes = [GinIndex(fields=["search_vector"])]

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        WebPage.objects.filter(pk=self.pk).update(
            search_vector=(
                SearchVector("title", weight="A") + SearchVector("content", weight="B")
            )
        )
