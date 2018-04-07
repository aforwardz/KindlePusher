from rest_framework.serializers import ModelSerializer
from ebook.models import Ebook


class EbookSerializer(ModelSerializer):
    class Meta:
        model = Ebook
        fields = '__all__'
