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
    full_name = serializers.CharField(write_only=True, required=False)
    phone_number = serializers.CharField(write_only=True, required=False)
    address = serializers.CharField(write_only=True, required=False)
    user_full_name = serializers.SerializerMethodField()
    user_phone_number = serializers.SerializerMethodField()
    user_address = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_date', 'payment_status',
            'total_amount', 'order_status', 'transaction_id',
            'payment_type', 'cart_items', 'created_at',
            'full_name', 'phone_number', 'address',
            'user_full_name', 'user_phone_number', 'user_address'
        ]
        read_only_fields = ['user', 'cart', 'user_full_name', 'user_phone_number', 'user_address']
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['cart_items'] = self.get_cart_items(instance)
        ret['user_full_name'] = getattr(instance.user, 'full_name', '')
        ret['user_phone_number'] = getattr(instance.user, 'phone_number', '')
        ret['user_address'] = getattr(instance.user, 'address', '')
        return ret

    def create(self, validated_data):
        full_name = validated_data.pop('full_name', None)
        phone_number = validated_data.pop('phone_number', None)
        address = validated_data.pop('address', None)
        user = self.context['request'].user
        updated = False
        if full_name and user.full_name != full_name:
            user.full_name = full_name
            updated = True
        if phone_number and user.phone_number != phone_number:
            user.phone_number = phone_number
            updated = True
        if address and user.address != address:
            user.address = address
            updated = True
        if updated:
            user.save()
        return super().create(validated_data)

    def get_user_full_name(self, obj):
        return getattr(obj.user, 'full_name', '')

    def get_user_phone_number(self, obj):
        return getattr(obj.user, 'phone_number', '')

    def get_user_address(self, obj):
        return getattr(obj.user, 'address', '')

    def get_cart_items(self, obj):
        if obj.cart:
            items = obj.cart.items.all()
            return CartItemSerializer(items, many=True).data
        return []
