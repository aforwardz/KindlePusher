# coding: utf-8
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class EbookManager(models.Manager):
    pass


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
    intro = models.TextField(
        verbose_name='介绍',
        blank=True,
        default=''
    )
    poster = models.ImageField(
        verbose_name='封面图'
    )
    poster_thumb = models.ImageField(
        verbose_name='封面缩略图'
    )

    price = models.DecimalField(
        verbose_name='价格',
        max_digits=10,
        decimal_places=2,
        blank=True
    )
    ebook_price = models.DecimalField(
        verbose_name='电子书价格',
        max_digits=8,
        decimal_places=2,
        blank=True
    )

    scores = models.DecimalField(
        verbose_name='评分',
        max_digits=3,
        decimal_places=1,
        blank=True,
        default=0.0
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
        verbose_name='点赞数',
        blank=True,
        default=0
    )

    wants = models.IntegerField(
        verbose_name='需求数',
        blank=True,
        default=0
    )

    pushes = models.IntegerField(
        verbose_name='推送数',
        blank=True,
        default=0
    )

    resource_status = models.BooleanField(
        verbose_name='资源状态',
        default=False
    )

    objects = EbookManager

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = verbose_name_plural = '电子书'


class ResourceManager(models.Manager):
    pass


class Resource(models.Model):
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_now=True)

    resource_name = models.CharField(
        verbose_name='资源名',
        max_length=100
    )

    pages = models.PositiveIntegerField(
        verbose_name='页数',
        blank=True,
        null=True
    )
    publisher = models.CharField(
        verbose_name='出版者',
        max_length=100,
        blank=True,
        default=''
    )
    publish_date = models.DateField(
        verbose_name='出版日期',
        blank=True
    )
    edition = models.PositiveIntegerField(
        verbose_name='版本',
        default=1
    )
    languages = models.CharField(
        verbose_name='语言',
        max_length=10,
        blank=True,
        default=''
    )
    format = models.CharField(
        verbose_name='格式',
        max_length=10,
        blank=True,
        default=''
    )

    contributor = models.CharField(
        verbose_name='贡献者',
        max_length=100,
        blank=True,
        default='aforwardz'
    )
    pushes = models.IntegerField(
        verbose_name='资源推送数',
        default=0
    )
    kp_coin = models.DecimalField(
        verbose_name='KP币',
        max_digits=3,
        decimal_places=1,
        blank=True,
        default=0.0
    )

    file = models.FileField(
        verbose_name='资源',
        blank=True,
        null=True
    )

    ebook = models.ForeignKey(
        Ebook,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    objects = ResourceManager

    def __str__(self):
        return self.resource_name

    class Meta:
        verbose_name = verbose_name_plural = '电子书资源'
