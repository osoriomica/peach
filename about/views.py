from django.shortcuts import render
from .models import About


# Create your views here.
def about(request):
    """
    Render the about page with information about the application.
    """
    about_info = About.objects.first()  # Only one About instance is expected
    return render(request, 'about/about.html', {'about': about_info},)
