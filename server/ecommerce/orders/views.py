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

logger = logging.getLogger(__name__)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, isCustomer]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related(
            'cart__items',
            'cart__items__book'
        ).order_by('-order_date')

    def perform_create(self, serializer):
        # Get or create cart for the user
        cart = Cart.objects.filter(user=self.request.user).first()
        
        # Log the order creation attempt
        logger.info(f"Creating order for user {self.request.user.username}")
        logger.info(f"Order data: {self.request.data}")
        
        try:
            # Save the order with the user and cart
            serializer.save(
                user=self.request.user,
                cart=cart
            )
            
            # Clear the cart after successful order creation
            if cart:
                cart.clear_cart()
                
            logger.info(f"Order created successfully for user {self.request.user.username}")
            
        except Exception as e:
            logger.error(f"Order creation failed: {str(e)}", exc_info=True)
            raise



