# coding: utf-8
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class Ebook(models.Model):
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_now=True)

    name = models.CharField(
        verbose_name='书名',
        max_length=100
    )
    en_name = models.CharField(
        verbose_name='英文书名',
        max_length=150,
        blank=True,
        default=''
    )
    alias = ArrayField(
        models.CharField(name='别名', max_length=150),
        verbose_name='别名列表',
        blank=True,
        default=[]
    )

    author = models.CharField(
        verbose_name='作者',
        max_length=100,
    )
    publish_date = models.DateField(
        verbose_name='出版日期',
        blank=True
    )
    version = models.PositiveIntegerField(
        verbose_name='版本',
        default=1
    )

    contributor = models.CharField(
        verbose_name='贡献者',
        max_length=100,
        blank=True,
        default='aforwardz'
    )

    format = models.CharField(
        verbose_name='格式',
        max_length=10,
        blank=True,
        default=''
    )

    price = models.FloatField(
        verbose_name='价格',
        blank=True
    )
    ebook_price = models.FloatField(
        verbose_name='电子书价格',
        blank=True
    )

    poster = models.ImageField(
        verbose_name='封面图'
    )
    poster_thumb = models.ImageField(
        verbose_name='封面缩略图'
    )

    rating = models.FloatField(
        verbose_name='评分',
        blank=True,
        default=0.0
    )

    source = models.CharField(
        verbose_name='资源',
        max_length=250
    )

    correct = models.BooleanField(verbose_name='书目信息是否正确', default=False)
    censored = models.CharField(
        verbose_name='是否审核',
        choices=(('uncensored', '未审核'), ('censored', '已审核')),
        max_length=20,
        default='uncensored'
    )
    recommend = models.BooleanField(verbose_name='是否推荐', default=False)
    free = models.BooleanField(verbose_name='是否免费', default=True)

    favors = models.IntegerField(
        verbose_name='收藏数',
        blank=True,
        default=0
    )

    pushes = models.IntegerField(
        verbose_name='推送数',
        blank=True,
        default=0
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = verbose_name_plural = '电子书'
