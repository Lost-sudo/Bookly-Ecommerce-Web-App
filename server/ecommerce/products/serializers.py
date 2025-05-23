from rest_framework import serializers
from .models import Book

class BookAdminSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'cover_image', 'stock', 'genre', 'sub_genre']
        read_only_fields = ['id']

class BookCustomerSerializer(serializers.ModelSerializer):
    genre = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'author', 'price', 'genre', 'category', 'cover_image']
        read_only_fields = ['id']