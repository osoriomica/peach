from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    """
    A user profile model for maintaining a record of
    their current subscription and highest score and level.
    """
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile"
        )

    # Game stats:
    score = models.IntegerField(default=0)
    level = models.CharField(max_length=100, default="Unknown")
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    # Subscription relationship
    subscription = models.OneToOneField('subscriptions.Subscription',
                                        on_delete=models.SET_NULL, null=True,
                                        blank=True)

    def __str__(self):
        return f"{self.user.username} Profile"
