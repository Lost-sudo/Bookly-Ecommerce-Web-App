from django.shortcuts import render
from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import isCustomer
from cart.models import Cart, CartItem
from rest_framework.exceptions import ValidationError

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, isCustomer]

    def get_queryset(self):
        if (self.request.user.is_superuser or self.request.user == 'admin'):
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            raise ValidationError("Cart does not exist.")
        
        cart_items = cart.items.all()
        if not cart_items.exists():
            raise ValidationError("Cart is empty. Cannot create order.")
        
        total_price = sum(item.book.price * item.quantity for item in cart_items)

        order = serializer.save(
            user=user,
            total_amount=total_price,
            cart=cart,
            order_status='pending',
            payment_type=self.request.data.get("payment_type"),
            transaction_id=self.request.data.get("transaction_id")
        )

        cart.clear_cart()



