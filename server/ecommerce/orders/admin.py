from django.contrib import admin
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'order_date', 'payment_status', 'order_status', 'total_amount', 'payment_type', 'created_at')
    list_filter = ('order_status', 'payment_status', 'payment_type', 'user')
    search_fields = ('user__username', 'transaction_id')
    ordering = ('-order_date',)
    
    list_editable = ('order_status', 'payment_status')

admin.site.register(Order, OrderAdmin)
