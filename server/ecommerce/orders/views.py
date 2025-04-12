from django.forms import ValidationError
from django.shortcuts import render
from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import isCustomer
from cart.models import Cart, CartItem

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, isCustomer]

    def get_queryset(self):
        if (self.request.user.is_superuser or self.request.user == 'admin'):
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        cart = Cart.objects.get(user=self.request.user)
        if not cart:
            raise ValidationError("Cart is empty. Add items to the cart before placing an order.")
        
        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items.exists():
            raise ValidationError("Cart is empty. Add items to the cart before placing an order.")
        
        total_amount = cart.calculate_total()

        amount_paid = self.request.data.get('payment_amount')
        try:
            amount_paid = float(amount_paid)
        except(TypeError, ValueError):
            raise ValidationError("Invalid payment amount.")
        
        if amount_paid < total_amount:
            raise ValidationError("Insufficient payment amount.")
        
        serializer.save(user=self.request.user, cart=cart, total_amount=total_amount, order_status='pending')
