from django.shortcuts import render
import socket
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import WebPage
from .model_serializer import web_page_serializer
from django.contrib.postgres.search import SearchQuery, SearchRank
from django.db.models import F
from django.core.paginator import Paginator  # Import Paginator


@api_view(["GET"])
def Search(request):
    hostname = socket.gethostname()
    query = request.query_params.get("q")
    page_number = request.query_params.get("page", 1)  # Get page number

    if not query:
        return Response({"results": [], "total_pages": 0, "count": 0})

    search_query = SearchQuery(query, search_type="websearch")
    search_rank = SearchRank(
        F("search_vector"), search_query, weights=[0.1, 0.2, 0.5, 1.0]
    )

    # 1. Get the QuerySet
    results = (
        WebPage.objects.filter(search_vector=search_query)
        .annotate(rank=search_rank)
        .order_by("-rank")
    )

    # 2. Paginate the QuerySet (10 items per page)
    paginator = Paginator(results, 10)
    page_obj = paginator.get_page(page_number)

    # 3. Serialize ONLY the current page
    serialized_data = web_page_serializer(page_obj, many=True)

    # 4. Return structured data including pagination info
    return Response(
        {
            "results": serialized_data.data,
            "total_pages": paginator.num_pages,
            "current_page": page_obj.number,
            "count": paginator.count,
        }
    )
