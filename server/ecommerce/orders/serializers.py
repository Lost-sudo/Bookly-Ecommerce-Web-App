from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 
            'user', 
            'cart', 
            'order_date', 
            'payment_status', 
            'total_amount', 
            'order_status', 
            'transaction_id', 
            'payment_type', 
        ]
        read_only_fields = ['id', 'user', 'cart', 'order_date', 'total_amount', 'order_status']