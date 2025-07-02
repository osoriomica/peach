from django.db import models
from django.contrib.auth.models import User
from game.models import GameScore
from cloudinary.models import CloudinaryField


# Create your models here.
class UserProfile(models.Model):
    """
    A user profile model for maintaining a record of
    their current subscription and highest score and level.
    """
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile"
        )
    joined = models.DateField(auto_now_add=True, blank=True, null=True)
    # Game stats:
    score = models.IntegerField(default=0)
    level = models.CharField(max_length=100, default="Unknown")
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    profile_image = CloudinaryField(
        'image',
        default='static/media/default',
        blank=True,
        null=True,
    )  # Cloudinary field for profile image

    # Subscription relationship
    subscription = models.OneToOneField('subscriptions.Subscription',
                                        on_delete=models.SET_NULL, null=True,
                                        blank=True)

    def __str__(self):
        return f"{self.user.username} Profile"

    @property
    def has_custom_profile_image(self):
        """
        Checks whether the user has uploaded a custom image (not the default).
        """
        return (
            self.profile_image and
            self.profile_image.public_id != 'static/media/default'
        )

    def highest_score_entry(self):
        return GameScore.objects.filter(user=self.user).order_by(
            '-score', '-created_at').first()
