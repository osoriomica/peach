import stripe
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Subscription
from django.contrib.auth.models import User


stripe.api_key = settings.STRIPE_SECRET_KEY


# Show princing table page
def subscription_required_view(request):
    return render(request, 'subscriptions/subscribe.html', {
        'STRIPE_PUBLIC_KEY': settings.STRIPE_PUBLIC_KEY
    })


# Succes and cancel pages
def subscription_success(request):
    return render(request, 'subscriptions/success.html')


def subscription_cancel(request):
    return render(request, 'subscriptions/cancel.html')


# Stripe webhook handler



