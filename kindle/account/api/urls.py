# coding:utf-8
from django.urls import re_path
from account.api import views

urlpatterns = [
    re_path(r'^wxlogin/$',
            views.AccountWxLoginView.as_view(),
            name='account_wx_login_view'
            ),
    re_path(r'^kdlogin/$',
            views.AccountKdLoginView.as_view(),
            name='account_kd_login_view'
            )
]