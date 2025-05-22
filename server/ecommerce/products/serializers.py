from rest_framework import serializers
from .models import Book

class BookAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'cover_image', 'stock']
        read_only_fields = ['id']

class BookCustomerSerializer(serializers.ModelSerializer):
    genre = serializers.StringRelatedField()
    sub_genre = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'genre', 'sub_genre', 'cover_image']
        read_only_fields = ['id']