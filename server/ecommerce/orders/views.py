from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from accounts.permissions import isCustomer
from django.db.models import Prefetch
from cart.models import CartItem

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, isCustomer]

    def get_queryset(self):
        # Optimize query with prefetch_related
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related(
            'cart__items',
            'cart__items__book'
        ).order_by('-order_date')



