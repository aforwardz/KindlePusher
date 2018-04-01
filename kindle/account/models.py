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


class Account(AbstractUser):
    nickname = models.CharField(max_length=50, unique=True)
    bio = models.CharField(max_length=120, blank=True)
    url = models.URLField(max_length=100, blank=True)
    location = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to=account_avatar)
    avatar_thumbnail = ImageSpecField(
        source='avatar',
        processors=[ResizeToFill(96, 96)],
        format='JPEG',
        options={'quality': 100})
    last_login_ip = models.GenericIPAddressField(
        unpack_ipv4=True, null=True, blank=True)
    ip_joined = models.GenericIPAddressField(
        unpack_ipv4=True, null=True, blank=True)

    client_mark = models.CharField(
        max_length=10, default='wechat', null=True, blank=True)

    wechat_nickName = models.CharField(max_length=50, null=True, blank=True)
    wechat_avatarUrl = models.URLField(max_length=200, null=True, blank=True)
    open_mark = models.BooleanField(default=True)
    wechat = models.CharField(max_length=50, null=True, blank=True, default='')

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.nickname:
            self.nickname = self.username

        if not self.avatar:
            avatar_img = pagan.Avatar(self.username, pagan.SHA256)
            self.avatar.save(
                'default_avatar.png',
                ContentFile(avatar_img),
                save=False
            )

        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return URLResolver.reverse('account:profile', args=(self.username,))
