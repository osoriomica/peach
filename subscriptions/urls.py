from django.urls import path
from .views import subscription_required_view


urlpatterns = [
    path('subscribe/', subscription_required_view,
         name='subscription_required'),
]
