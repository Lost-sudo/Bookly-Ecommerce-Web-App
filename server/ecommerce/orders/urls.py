from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderListView

router = DefaultRouter()
router.register('orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls),),
    path('', OrderListView.as_view(), name='order-list'),  # Ensure this line exists
]