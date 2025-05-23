from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import logging
from .models import Order
from .serializers import OrderSerializer
from accounts.permissions import isCustomer
from cart.models import Cart
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.mixins import CreateModelMixin

logger = logging.getLogger(__name__)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, isCustomer]
    queryset = Order.objects.select_related('user', 'cart').all()

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)
    
    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        logger.info(f"Order created for user {self.request.user.username}")
        # Clear the user's cart after successful order creation
        cart = getattr(order, 'cart', None)
        if cart:
            cart.clear_cart()



