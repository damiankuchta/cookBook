import math

from rest_framework import pagination
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'page': self.page.number,
            'pages_amount': math.ceil(self.page.paginator.count/self.page_size),
            'count': self.page.paginator.count,
            'results': data
        })