# coding:utf-8
from django.urls import re_path
from ebook.api import views

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$',
            views.EbookRetrieveView.as_view(),
            name='ebook_retrieve_view'
            ),
    re_path(r'^latest/$',
            views.EbookLatestView.as_view(),
            name='ebook_latest_view',
            ),
    re_path(r'^recommend/$',
            views.EbookRecommendView.as_view(),
            name='ebook_recommend_view',
            ),
    re_path(r'^rank/$',
            views.EbookRankView.as_view(),
            name='ebook_rank_view'
            ),
    re_path(r'^free/$',
            views.EbookFreeView.as_view(),
            name='ebook_free_view',
            ),
    re_path(r'^push/$',
            views.EbookPushView.as_view(),
            name='ebook_push_view',
            ),
]
