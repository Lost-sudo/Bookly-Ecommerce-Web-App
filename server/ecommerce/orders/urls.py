# server/ecommerce/orders/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('api/orders/', include(router.urls)),  # Updated path to match the frontend request
]