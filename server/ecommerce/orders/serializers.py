from rest_framework import serializers
from .models import Order
from cart.serializers import CartItemSerializer

class OrderSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(
        source='cart.items',
        many=True,
        read_only=True
    )

    class Meta:
        model = Order
        fields = [
          'id','user','cart','order_date',
          'payment_status','total_amount','order_status',
          'transaction_id','payment_type','payment_amount',
          'created_at','updated_at',
          'cart_items',
        ]
        read_only_fields = ('user','cart','total_amount','order_status')
