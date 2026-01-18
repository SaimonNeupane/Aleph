from django.shortcuts import render
import socket
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import WebPage
from .model_serializer import web_page_serializer
from django.contrib.postgres.search import SearchQuery, SearchRank
from django.db.models import F


# Create your views here.
@api_view(["GET"])
def Search(request):
    hostname = socket.gethostname()
    print(f"Served by {hostname}")
    query = request.query_params.get("q")
    print(query)
    if not query:
        return Response([])
    search_query = SearchQuery(query, search_type="websearch")
    search_rank = SearchRank(
        F("search_vector"), search_query, weights=[0.1, 0.2, 0.5, 1.0]
    )
    results = (
        WebPage.objects.filter(search_vector=search_query)
        .annotate(rank=search_rank)
        .order_by("-rank")
    )
    serialized_data = web_page_serializer(results, many=True)
    return Response(serialized_data.data)
