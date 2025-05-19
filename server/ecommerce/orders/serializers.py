from rest_framework import serializers
from .models import Order
from products.models import Book
from cart.models import CartItem
from django.contrib.auth import get_user_model

User = get_user_model()

class BookOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price']

class CartItemOrderSerializer(serializers.ModelSerializer):
    book = BookOrderSerializer()
    
    class Meta:
        model = CartItem
        fields = ['id', 'book', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    cart_items = CartItemOrderSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_date', 'payment_status',
            'total_amount', 'order_status', 'transaction_id',
            'payment_type', 'cart_items', 'created_at'
        ]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.cart:
            cart_items = instance.cart.items.all()
            ret['cart_items'] = CartItemOrderSerializer(cart_items, many=True).data
        else:
            ret['cart_items'] = []
        return ret
