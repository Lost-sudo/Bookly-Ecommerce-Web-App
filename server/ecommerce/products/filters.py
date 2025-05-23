from django_filters.rest_framework import FilterSet, filters
from .models import Book

class BookFilter(FilterSet):
    genre = filters.CharFilter(field_name='genre__name', lookup_expr='icontains')
    sub_genre = filters.CharFilter(field_name='sub_genre__name', lookup_expr='icontains')

    class Meta:
        model = Book
        fields = ['genre', 'sub_genre']
