from rest_framework.serializers import ModelSerializer
from account.models import Account


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        exclude = ('openId',)
