from django.contrib import admin
from .models import Subscription


# Register your models here.
@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'stripe_customer_id', 'stripe_subscription_id', 'is_active'
        )
    search_fields = (
        'user__email', 'stripe_customer_id', 'stripe_subscription_id'
        )
    list_filter = ('is_active',)
