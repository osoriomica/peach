from django.urls import path
from .views import (
    subscription_required_view,
    subscription_cancel,
    subscription_success,
    stripe_webhook
)

urlpatterns = [
    path('subscribe/', subscription_required_view,
         name='subscription_required'),
    path('success/', subscription_success, name='subscription_success'),
    path('cancel/', subscription_cancel, name='subscription_cancel'),
    path('webhook/', stripe_webhook, name='stripe_webhook'),
]
