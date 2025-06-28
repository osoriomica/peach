from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Stripe
    stripe_customer_id = models.CharField(max_length=255, unique=True)
    stripe_subscription_id = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    start_date = models.DateTimeField(null=True, blank=True)
    current_period_end = models.DateTimeField(null=True, blank=True)
    plan_interval = models.CharField(max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} | Active: {self.is_active}"
