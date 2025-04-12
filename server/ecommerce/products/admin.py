from django.contrib import admin
from .models import Book, Category
from django.utils.html import format_html

class BookAdmin(admin.ModelAdmin):
    # List of fields to display in the list view
    list_display = ('title', 'author', 'price', 'stock', 'category', 'cover_image_display')

    # Searchable fields in the admin
    search_fields = ('title', 'author', 'price', 'stock')

    # Filter options in the right sidebar
    list_filter = ('category', 'price')

    # Add inline for Category (optional if you want to allow adding books directly from categories)
    # inlines = [BookInline] 

    # Add stock alert if stock is low
    def stock_alert(self, obj):
        if obj.stock < 10:
            return format_html('<span style="color: red; font-weight: bold;">Low Stock!</span>')
        return "In Stock"
    
    stock_alert.short_description = "Stock Alert"
    
    # Display cover image in the list view
    def cover_image_display(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" width="50" height="50" />', obj.cover_image.url)
        return "No Image"
    cover_image_display.short_description = "Cover Image"

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(Book, BookAdmin)
admin.site.register(Category, CategoryAdmin)
