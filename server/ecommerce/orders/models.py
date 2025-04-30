from django.db import models
from django.conf import settings

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
    ]

    PAYMENT_TYPE_CHOICES = [
        ('credit_card', 'Credit Card'),
        ('paypal', 'Paypal'),
        ('cash', 'Cash'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cart = models.ForeignKey('cart.Cart', on_delete=models.SET_NULL, null=True, blank=True)
    order_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=255, blank=True, null=True)
    payment_type = models.CharField(max_length=20, choices=PAYMENT_TYPE_CHOICES, blank=True, null=True)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} by {self.user.username} - {self.order_status}"

    def update_order_status(self, status):
        if status in dict(self.STATUS_CHOICES).keys():
            self.order_status = status
            self.save()

    def mark_paid(self, transaction_id, payment_type, payment_amount):
        self.payment_status = 'paid'
        self.transaction_id = transaction_id
        self.payment_type = payment_type
        self.payment_amount = payment_amount
        self.save()
