# coding: utf-8
import redis
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from weixin import WXAPPAPI
from utils.WXBizDataCrypt import WXBizDataCrypt
from account.models import Account
from account.api.serializers import AccountSerializer

APP_ID = 'wxe1c4c468ccfcf47c'
APP_SECRET = '12a2531abbea92bd42755d40c4738af5'
api = WXAPPAPI(appid=APP_ID, app_secret=APP_SECRET)
rclient = redis.Redis()


class AccountWxLoginView(APIView):
    def get(self, request):
        code = request.query_params.get('code')
        session_info = api.exchange_code_for_session_key(code=code)
        # 获取session_info 后

        session_key = session_info.get('session_key')
        if session_key:
            rclient.set('session_key', session_key, ex=60)
            return Response({'detail': 'login then need to checked', 'status': 'check'})
        else:
            raise Exception({'detail': 'no session key'})


class AccountKdLoginView(GenericAPIView):
    serializer_class = AccountSerializer

    def post(self, request):
        encrypted_data = request.data.get('encryptedData')
        iv = request.data.get('iv')
        session_key = rclient.get('session_key').decode('utf-8')
        crypt = WXBizDataCrypt(APP_ID, session_key)

        # encrypted_data 包括敏感数据在内的完整用户信息的加密数据
        # iv 加密算法的初始向量
        # 这两个参数需要js获取
        user_info = crypt.decrypt(encrypted_data, iv)
        if not Account.objects.filter(openId=user_info.get('openId')).exists():
            account = Account(
                openId=user_info.get('openId'),
                nickname=user_info.get('nickName'),
                gender=str(user_info.get('gender')),
                province=user_info.get('province'),
                city=user_info.get('city'),
                avatar=user_info.get('avatarUrl'),
            )
            account.save()
        else:
            account = Account.objects.get(openId=user_info.get('openId'))

        # queryset = Account.objects.filter(openId=user_info.get('openId'))

        return Response(self.serializer_class(account).data)
