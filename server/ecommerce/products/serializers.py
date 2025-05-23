from rest_framework import serializers
from .models import Book

class BookAdminSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'cover_image', 'stock', 'genre', 'sub_genre']
        read_only_fields = ['id']

class BookCustomerSerializer(serializers.ModelSerializer):
    genre = serializers.SerializerMethodField()
    sub_genre = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'description', 'price', 'category', 'genre', 'sub_genre', 'cover_image']
        read_only_fields = ['id']

    def get_genre(self, obj):
        return obj.genre.name if obj.genre else None

    def get_sub_genre(self, obj):
        return obj.sub_genre.name if obj.sub_genre else None

    def get_category(self, obj):
        return obj.category.name if obj.category else None

    def get_cover_image(self, obj):
        # Return the URL if cover_image exists, else None
        if obj.cover_image:
            try:
                return obj.cover_image.url
            except Exception:
                return None
        return None