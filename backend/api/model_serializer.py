from rest_framework import serializers
from . import models


class web_page_serializer(serializers.ModelSerializer):
    class Meta:
        model = models.WebPage
        fields = "__all__"
