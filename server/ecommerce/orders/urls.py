# server/ecommerce/orders/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='orders')  # Ensure basename matches

urlpatterns = [
    path('api/', include(router.urls)),
]