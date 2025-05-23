from rest_framework import serializers
from .models import Order
from products.models import Book
from cart.models import CartItem
from cart.serializers import CartItemSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class BookOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 'total_amount', 'payment_type', 'transaction_id',
            'full_name', 'phone_number', 'address'
        ]

class CartItemOrderSerializer(serializers.ModelSerializer):
    book = BookOrderSerializer()
    
    class Meta:
        model = CartItem
        fields = ['id', 'book', 'quantity']

class UserOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class OrderSerializer(serializers.ModelSerializer):
    cart_items = CartItemOrderSerializer(many=True, read_only=True)
    user = UserOrderSerializer(read_only=True)  # Include user details

    class Meta:
        model = Order
        fields = [
            'id', 'transaction_id', 'order_date', 'payment_status', 'total_amount',
            'order_status', 'payment_type', 'cart_items', 'user', 'full_name',
            'phone_number', 'address'
        ]
        read_only_fields = ['id', 'order_date', 'user']

    def get_cart_items(self, obj):
        # Assuming `cart_items` is a related field in the `Order` model
        return [
            {
                "book": {
                    "title": item.book.title,
                    "author": item.book.author,
                    "price": item.book.price,
                },
                "quantity": item.quantity,
            }
            for item in obj.cart_items.all()
        ]
