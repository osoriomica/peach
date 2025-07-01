from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse


# Create your views here.
def index(request):
    """
    Render the home page.
    """
    return render(request, 'home/index.html')


def test_email(request):

    try:
        send_mail('Test Subject', 'This is a test message from my Django app.', 'peachkaboom1@gmail.com', ['osoriomica@gmail.com'], fail_silently=False,)
        return HttpResponse("SUCCESS", content_type="text/plain")
    except Exception as e:
        return HttpResponse(f"Error sending email: {e}", content_type="text/plain")
