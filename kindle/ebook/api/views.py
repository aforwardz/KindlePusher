# coding: utf-8
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from django.shortcuts import get_object_or_404
from ebook.api.serializers import EbookSerializer
from ebook.models import Ebook
from utils.handler import _send_mail


class EbookRetrieveView(RetrieveAPIView):
    serializer_class = EbookSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter
    )

    def get_object(self):
        obj = get_object_or_404(Ebook, pk=self.kwargs.get('pk', 0))
        return obj


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


class EbookPushView(APIView):
    def post(self, request):
        if not request.data.get('ebook_id'):
            return Response({'detail': 'NO EBOOK ID PROVIDED', 'statusText': 'MISS'})

        ebook_id = request.data.get('ebook_id')
        ebook = Ebook.objects.filter(id=ebook_id)
        if not ebook.exists():
            return Response({'detail': 'EBOOK NOT EXISTS', 'statusText': 'NOT EXISTS'})

        ebook = ebook.first()
        if not ebook.source:
            return Response({'detail': 'SOURCE NOT FOUND', 'statusText': 'NOT FOUND'})

        res = _send_mail(
            email_to=[],
            subject='{} {} 消息发送日志',
            message_body="",
            email_from="",
            message_html='',
            custom_headers={},
            attachment_path="",
            extra_attachment_header=None,
        )
