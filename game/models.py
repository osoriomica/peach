from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class GameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             null=True, blank=True)
    score = models.IntegerField()
    level = models.CharField(max_length=100, default="unknown")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User: {self.user.username} | Highest score: {
            self.score} | Level: {self.score} | Timestamp: {
                self.created_at}"
