from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import isCustomer
from rest_framework.response import Response
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
    
    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        book = serializer.validated_data['book']
        item, created = CartItem.objects.get_or_create(cart=cart, book=book)
        if not created:
            item.quantity += serializer.validated_data['quantity']
            item.save()
        else:
            serializer.save(cart=cart)