from django_filters.rest_framework import FilterSet, filters
from .models import Book

class BookFilter(FilterSet):
    genre = filters.CharFilter(field_name="genre__name", lookup_expr='iexact')
    sub_genre = filters.CharFilter(field_name="sub_genre__name", lookup_expr='iexact')
    category = filters.CharFilter(field_name="category__name", lookup_expr='iexact')
    author = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Book
        fields = ['genre', 'sub_genre', 'category', 'author']
