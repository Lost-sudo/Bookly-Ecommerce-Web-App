from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    
    list_display = ('username', 'email', 'full_name', 'phone_number', 'role', 'is_staff', 'is_active', 'date_joined')
    
    list_filter = ('is_staff', 'is_active', 'role', 'groups')
    
    search_fields = ('username', 'email')
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('full_name', 'email', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'role')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'full_name', 'email', 'phone_number', 'role', 'is_staff', 'is_active'),
        }),
    )
    
    readonly_fields = ('date_joined', 'last_login')

admin.site.register(CustomUser, CustomUserAdmin)
