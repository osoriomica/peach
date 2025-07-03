from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def index(request):
    """
    Render the home page.
    """
    return render(request, 'home/index.html')


def robots_txt(request):
    """
    Render the robots.txt file.
    """
    lines = [
        "User-agent: *",
        "Disallow:",
        "Sitemap: https://peachkaboom-132026d215d5.herokuapp.com/sitemap.xml"
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")
