from rest_framework import serializers
from .models import Order
from products.models import Book
from cart.models import CartItem
from cart.serializers import CartItemSerializer
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
    cart_items = serializers.SerializerMethodField()
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    phone_number = serializers.CharField(source='user.phone_number', read_only=True)
    address = serializers.CharField(source='user.address', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'transaction_id', 'order_date', 'payment_status', 'total_amount',
            'order_status', 'payment_type', 'cart_items', 'full_name', 'phone_number', 'address'
        ]

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
