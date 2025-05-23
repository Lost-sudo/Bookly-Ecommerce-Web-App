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

class OrderViewSet(ReadOnlyModelViewSet, CreateModelMixin):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, isCustomer]
    queryset = Order.objects.select_related('user').prefetch_related('cart_items__book')

    def get_queryset(self):
        # Filter orders by the authenticated user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save the order with the user
        serializer.save(user=self.request.user)



