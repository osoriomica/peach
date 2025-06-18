from django.urls import path
# from . import views
from .views import (
    subscription_required_view,
    create_checkout_session,
    subscription_cancel,
    subscription_success
)

urlpatterns = [
    path('subscribe/', subscription_required_view,
         name='subscription_required'),
    path('create-checkout-session/', create_checkout_session, name='create_checkout_session'),
    path('success/', subscription_success, name='subscription_success'),
    path('cancel/', subscription_cancel, name='subscription_cancel'),
]
