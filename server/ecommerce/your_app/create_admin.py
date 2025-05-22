from django.contrib.auth import get_user_model

def run():
    User = get_user_model()
    username = "admin"
    email = "admin@example.com"
    password = "your_secure_password"
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, email=email, password=password)
