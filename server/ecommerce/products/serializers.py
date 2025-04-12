from rest_framework import serializers
from .models import Book

class BookAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'cover_image', 'stock']
        read_only_fields = ['id']

class BookCustomerSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'cover_image']
        read_only_fields = ['id']