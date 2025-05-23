from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Book
from accounts.permissions import isAdmin, isCustomer
from .serializers import BookAdminSerializer, BookCustomerSerializer
from .filters import BookFilter
from rest_framework.parsers import MultiPartParser, FormParser



class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookCustomerSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BookFilter
    search_fields = ['title', 'author', 'description']

    @action(detail=False, methods=['get'], url_path='trending')
    def trending_books(self, request):
        queryset = Book.objects.filter(category__isnull=False).order_by('-created_at')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class BookAdminViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookAdminSerializer
    permission_classes = [isAdmin]
    parser_classes = [MultiPartParser, FormParser]