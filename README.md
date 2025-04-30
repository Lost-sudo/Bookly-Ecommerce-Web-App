Great! Since you’ve completed the **user order history** feature, here’s an updated version of the `README.md` with that reflected in the relevant sections:

---

```markdown
# 🛍️ Django E-Commerce Ordering System

A backend API for a simple bookstore-style e-commerce platform using **Django** and **Django REST Framework**. Users can add books to a cart and place orders. The system handles authentication, validation, and basic order logic.

> ⚠️ **NOTE:** This project is still in development and not yet production-ready.

---

## 🔧 Tech Stack

- Python 3.x
- Django 5.x
- Django REST Framework
- SQLite (default, can be swapped)
- JWT Authentication (recommended but optional)

---

## 📁 Project Structure

```
ecommerce/
├── accounts/             # Custom user model, registration, permissions
│   ├── models.py
│   └── permissions.py
├── cart/                 # Cart and CartItem models
│   ├── models.py
│   └── views.py
├── orders/               # Order placement and tracking
│   ├── models.py
│   ├── serializers.py
│   └── views.py
├── products/             # Book product model
│   └── models.py
└── ecommerce/            # Main project config
    ├── settings.py
    └── urls.py
```

---

## 🧑‍💻 Custom User Model

The system uses a custom user model to allow for flexible user handling:

```python
# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_customer = models.BooleanField(default=True)

    def __str__(self):
        return self.username
```

In `settings.py`, ensure this is added:
```python
AUTH_USER_MODEL = 'accounts.User'
```

---

## 🛒 Cart System

```python
# cart/models.py
from django.conf import settings
from django.db import models
from products.models import Book
from decimal import Decimal
from rest_framework.exceptions import ValidationError

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total(self):
        return sum(item.quantity * item.book.price for item in self.items.all())

    def clear_cart(self):
        self.items.all().delete()

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'book')

    def save(self, *args, **kwargs):
        if self.quantity <= 0:
            raise ValidationError("Quantity must be greater than zero.")
        super().save(*args, **kwargs)
```

---

## 📦 Order System

```python
# orders/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import Order
from .serializers import OrderSerializer
from cart.models import Cart

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        user = self.request.user
        cart = Cart.objects.get(user=user)

        if not cart.items.exists():
            raise ValidationError("Cart is empty.")

        if Order.objects.filter(cart=cart).exists():
            raise ValidationError("Order already exists for this cart.")

        total_price = cart.calculate_total()
        order = serializer.save(user=user, total_amount=total_price, cart=cart, order_status='pending')

        cart.clear_cart()
        cart.delete()
```

---

## 📋 Features

- ✅ Custom user model (`AUTH_USER_MODEL`)
- ✅ Cart system per user
- ✅ Cart item validation
- ✅ Prevent multiple orders per cart
- ✅ Order total auto-calculation
- ✅ User order history (list past orders)
- ✅ Permissions for customer-only access
- 🚫 No payment integration yet
- 🚫 No admin dashboard
- 🚫 No user interface (frontend)

---

## 🚀 Setup Instructions

1. **Clone the project:**
   ```bash
   git clone <your-repo-url>
   cd ecommerce
   ```

2. **Create a virtual environment and install dependencies:**
   ```bash
   python -m venv env
   source env/bin/activate  # or env\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

3. **Apply migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create superuser (optional for admin access):**
   ```bash
   python manage.py createsuperuser
   ```

5. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

---

## 🛠 API Endpoints (Sample)

- `POST /api/cart/add/` – Add book to cart
- `GET /api/cart/` – View current user's cart
- `POST /api/orders/` – Place an order
- `GET /api/orders/` – View authenticated user's order history

---

## 📌 Notes

- You **must** define `AUTH_USER_MODEL` in settings before first migration.
- Cart must exist for each user before placing an order.
- Each cart is tied to only one order (validated server-side).
- This is a backend-only application; frontend must be built separately (e.g. with React or Vue).

---

## ✅ Future Plans

- [ ] Payment gateway integration (e.g., Stripe)
- [x] User order history views ✅
- [ ] Admin order management
- [ ] Frontend interface (React)
- [ ] Unit & integration tests

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📢 Status

**🚧 This project is incomplete. Development is ongoing. Not ready for production use.**

---
```

---

Let me know if you’d like to also reflect changes in the endpoint descriptions, API documentation, or test coverage.
