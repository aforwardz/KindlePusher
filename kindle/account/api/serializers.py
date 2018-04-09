from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from account.models import Account


class AccountSerializer(ModelSerializer):
    gender = serializers.SerializerMethodField(source='get_gender_display', read_only=True)

    def get_gender(self, obj):
        return obj.get_gender_display()

    class Meta:
        model = Account
        exclude = ('openId',)
