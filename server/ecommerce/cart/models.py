from django.db import models
from django.conf import settings
from django.db.models import F
from products.models import Book
from decimal import Decimal
from rest_framework.exceptions import ValidationError

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Cart"
    
    def calculate_total(self):
        total = sum(item.quantity * item.book.price for item in self.items.all())
        return Decimal(total).quantize(Decimal('0.01'))
    
    def add_item(self, book, quantity=1):
        cart_item, created = CartItem.objects.get_or_create(cart=self, book=book)
        cart_item.quantity += quantity
        cart_item.save()

    def remove_item(self, book):
        CartItem.objects.filter(cart=self, book=book).delete()

    def clear_cart(self):
        self.items.all().delete()

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'book')

    def __str__(self):
        return f"{self.book.title} x {self.quantity}"

    def save(self, *args, **kwargs):
        if self.quantity <= 0:
            raise ValidationError("Quantity cannot be zero or negative.")
        super().save(*args, **kwargs)
