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



class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookCustomerSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BookFilter
    search_fields = ['title', 'author', 'description']

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset.exists():
            # --- Sample products fallback ---
            sample_products = [
                {
                    "id": 1001,
                    "title": "The Pragmatic Programmer",
                    "author": "Andrew Hunt, David Thomas",
                    "description": "A classic book for software engineers.",
                    "price": "1200.00",
                    "category": "Programming",
                    "genre": "Technology",
                    "sub_genre": "Software Engineering",
                    "cover_image": "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/tpp20.jpg"
                },
                {
                    "id": 1002,
                    "title": "z ",
                    "author": "Robert C. Martin",
                    "description": "A Handbook of Agile Software Craftsmanship.",
                    "price": "950.00",
                    "category": "Programming",
                    "genre": "Technology",
                    "sub_genre": "Software Engineering",
                    "cover_image": "blob:https://www.kobo.com/86cf7011-a17c-4306-bea5-1886a41f7609"
                },
                {
                    "id": 1003,
                    "title": "Atomic Habits",
                    "author": "James Clear",
                    "description": "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
                    "price": "800.00",
                    "category": "Self-Help",
                    "genre": "Nonfiction",
                    "sub_genre": "Personal Development",
                    "cover_image": "blob:https://www.kobo.com/7d92cbd0-77bd-4e73-8d28-78d62cf0cb64"
                },
                # ...add more sample products as needed...
            ]
            # Use serializer to keep response format consistent
            serializer = self.get_serializer(sample_products, many=True)
            return Response(serializer.data)
        return super().list(request, *args, **kwargs)

    @action(detail=False, methods=['get'], url_path='trending')
    def trending_books(self, request):
        queryset = Book.objects.filter(category__isnull=False).order_by('-created_at')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class BookAdminViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookAdminSerializer
    permission_classes = [isAdmin]