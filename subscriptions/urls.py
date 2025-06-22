from django.urls import path
from . import views


urlpatterns = [
    path('subscribe/', views.subscription_required_view,
         name='subscription_required'),
    path('success/', views.subscription_success, name='subscription_success'),
    path('cancel/', views.subscription_cancel, name='subscription_cancel'),
    path('webhook/', views.stripe_webhook, name='stripe_webhook'),
]
