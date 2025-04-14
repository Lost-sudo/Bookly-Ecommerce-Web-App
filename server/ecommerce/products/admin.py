from django.contrib import admin
from .models import Book, Category, Genre, SubGenre
from django.utils.html import format_html

class BookAdmin(admin.ModelAdmin):

    list_display = ('title', 'author', 'price', 'stock', 'category', 'genre', 'sub_genre', 'cover_image_display')

    search_fields = ('title', 'author', 'price', 'stock')

    list_filter = ('category', 'genre', 'sub_genre', 'price')

    def stock_alert(self, obj):
        if obj.stock < 10:
            return format_html('<span style="color: red; font-weight: bold;">Low Stock!</span>')
        return "In Stock"
    
    stock_alert.short_description = "Stock Alert"
    
    def cover_image_display(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" width="50" height="50" />', obj.cover_image.url)
        return "No Image"
    cover_image_display.short_description = "Cover Image"

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)

class SubGenreAdmin(admin.ModelAdmin):
    list_display = ('name', 'genre')

admin.site.register(Book, BookAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(SubGenre, SubGenreAdmin)
