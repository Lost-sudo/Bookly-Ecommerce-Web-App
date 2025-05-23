from rest_framework import serializers
from .models import Book

class BookAdminSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(required=False, allow_null=True)
    genre = serializers.CharField(source='genre.name', read_only=True)
    sub_genre = serializers.CharField(source='sub_genre.name', read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'cover_image', 'stock', 'genre', 'sub_genre']
        read_only_fields = ['id']

class BookCustomerSerializer(serializers.ModelSerializer):
    genre = serializers.StringRelatedField()
    sub_genre = serializers.StringRelatedField()
    category = serializers.StringRelatedField()
    cover_image = serializers.ImageField(read_only=True)  # Correctly configured

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'genre', 'sub_genre', 'cover_image']
        read_only_fields = ['id']

class BookSerializer(serializers.ModelSerializer):
    genre = serializers.StringRelatedField()
    sub_genre = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author',
            'description',
            'price',
            'cover_image',
            'genre',
            'sub_genre',
            'category',
        ]