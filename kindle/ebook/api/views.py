# coding: utf-8
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)
from rest_framework.response import Response
from rest_framework import filters
from ebook.api.serializers import EbookSerializer
from ebook.models import Ebook


class EbookRetrieveView(RetrieveAPIView):
    serializer_class = EbookSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter
    )

    def get(self, request, *args, **kwargs):
        pass


class EbookLatestView(ListAPIView):
    serializer_class = EbookSerializer
    queryset = Ebook.objects.all()

    def get_queryset(self):
        queryset = self.queryset.order_by('create_time').order_by(
            'name').distinct('name')[5:]
        return queryset


class EbookRecommendView(ListAPIView):
    serializer_class = EbookSerializer
    queryset = Ebook.objects.all()

    def get_queryset(self):
        queryset = self.queryset.filter(recommend=True)[5:]
        return queryset


class EbookRankView(ListAPIView):
    serializer_class = EbookSerializer
    queryset = Ebook.objects.all()

    def get_queryset(self):
        queryset = self.queryset.order_by('rating').order_by(
            'name').distinct('name')[10:]
        return queryset


class EbookFreeView(ListAPIView):
    serializer_class = EbookSerializer
    queryset = Ebook.objects.all()

    def get_queryset(self):
        queryset = self.queryset.filter(free=True).order_by(
            'create_time').order_by('name').distinct('name')

        return queryset
