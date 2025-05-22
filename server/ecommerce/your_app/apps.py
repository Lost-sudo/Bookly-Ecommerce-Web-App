from django.apps import AppConfig
from .create_admin import run as create_admin

class YourAppConfig(AppConfig):
    name = 'your_app'

    def ready(self):
        create_admin()