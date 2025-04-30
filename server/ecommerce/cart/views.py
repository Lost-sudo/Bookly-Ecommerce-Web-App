from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import isCustomer
from rest_framework.response import Response
from products.models import Book
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

# Create your views here.

class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, isCustomer]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated, isCustomer]

    def get_queryset(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return CartItem.objects.filter(cart=cart)
    
    def create(self, request, *args, **kwargs):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        book_id = request.data.get('book')
        quantity = request.data.get('quantity', 1)

        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({"detail": "Book not found."}, status=status.HTTP_400_BAD_REQUEST)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, book=book)

        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()
        else:
            cart_item.quantity = int(quantity)
            cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)