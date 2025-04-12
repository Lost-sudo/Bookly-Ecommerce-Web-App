from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import BookAdminViewSet, BookViewSet


router = DefaultRouter()
router.register(r'books', BookViewSet, basename='books')
router.register(r'admin/books', BookAdminViewSet, basename='admin-books')

urlpatterns = router.urls