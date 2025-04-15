from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Book
from accounts.permissions import isAdmin, isCustomer
from .serializers import BookAdminSerializer, BookCustomerSerializer

class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookCustomerSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['genre', 'sub_genre', 'category']
    search_fields = ['title', 'author', 'description']

class BookAdminViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookAdminSerializer
    permission_classes = [IsAuthenticated, isAdmin]