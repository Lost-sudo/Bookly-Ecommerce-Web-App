from rest_framework import serializers
from .models import Order
from products.models import Book
from cart.models import CartItem
from django.contrib.auth import get_user_model
import logging

User = get_user_model()
logger = logging.getLogger(__name__)

# Add a minimal Book serializer for cart items in orders
class BookMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price']

class CartItemOrderSerializer(serializers.ModelSerializer):
    book = BookMiniSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'book', 'quantity']

class UserOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class OrderSerializer(serializers.ModelSerializer):
    cart_items = CartItemOrderSerializer(many=True, read_only=True, source='cart.items')
    user = UserOrderSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'transaction_id', 'order_date', 'payment_status', 'total_amount',
            'order_status', 'payment_type', 'cart_items', 'user', 'full_name',
            'phone_number', 'address'
        ]
        read_only_fields = ['id', 'order_date', 'user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Ensure cart_items is always a list
        if data.get('cart_items') is None:
            data['cart_items'] = []
        return data

    def create(self, validated_data):
        logger.info(f"Creating order with data: {validated_data}")
        return super().create(validated_data)
