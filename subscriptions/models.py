from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=255)
    stripe_subscription_id = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - Active: {self.is_active}"
