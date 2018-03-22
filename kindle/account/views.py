# coding: utf-8
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required

# from account.forms import SignupForm, AvatarForm
from account.models import Account
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from account.serializers import AccountSerializer

# Create your views here.



