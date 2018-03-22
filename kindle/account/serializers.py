from account.models import Account
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fileds = ('id', 'username', 'nickname', 'bio', 'url',
                  'location', 'avatar', 'client_mark', 'wechat_nickName',
                  'wechat_avatarUrl', 'open_mark', 'wechat')
