from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'full_name', 'phone_number', 'address']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            full_name=validated_data.get('full_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            address=validated_data.get('address', ''),
            password=validated_data['password']
        )
        return user
    
class CustomeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'full_name', 'phone_number', 'address']