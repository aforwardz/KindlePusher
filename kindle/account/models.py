# coding: utf-8
import os
from django.db import models
from django.core.files.base import ContentFile
from django.contrib.auth.models import AbstractUser
from django.urls.resolvers import URLResolver

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
import pagan

# Create your models here.


def account_avatar(obj, file):
    return os.path.join('avatars', obj.username, file)


class Account(models.Model):
    openId = models.CharField(verbose_name='OpenID', max_length=200)
    nickname = models.CharField(verbose_name='昵称', max_length=50, unique=True)
    gender = models.CharField(verbose_name='性别', max_length=1, choices=(('0', '女'), ('1', '男')), blank=True, default='1')
    bio = models.CharField(verbose_name='简介', max_length=120, blank=True)
    province = models.CharField(verbose_name='省份', max_length=100, blank=True)
    city = models.CharField(verbose_name='城市', max_length=100, blank=True)
    avatar = models.URLField(verbose_name='头像')

    kindle_email = models.EmailField(
        verbose_name='Kindle账户邮件地址',
        blank=True
    )

    pushes = models.IntegerField(verbose_name='推送量', default=0)
    favors = models.IntegerField(verbose_name='收藏量', default=0)
    contributes = models.IntegerField(verbose_name='贡献量', default=0)

    def __str__(self):
        return self.nickname
