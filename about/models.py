from django.db import models


# Create your models here.
class About(models.Model):
    """
    Model to store information about the application.
    """
    class Meta:
        verbose_name = "About"
        verbose_name_plural = "About"

    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    about_image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.title
