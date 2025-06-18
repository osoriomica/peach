import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.shortcuts import render


stripe.api_key = settings.STRIPE_SECRET_KEY


# Create your views here.
def subscription_required_view(request):
    return render(request, 'subscriptions/subscribe.html')


# Stripe views
@login_required
def create_checkout_session(request):
    domain = request.build_absolute_uri('')[:-1]
    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email=request.user.email,
            payment_method_types=['card'],
            line_items=[{
                'price': settings.STRIPE_PRICE_ID,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f'{domain}/subscriptions/success/',
            cancel_url=f'{domain}/subscriptions/cancel/',
        )
        return JsonResponse({'id': checkout_session.id})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


def subscription_success(request):
    return render(request, 'subscriptions/success.html')


def subscription_cancel(request):
    return render(request, 'subscriptions/cancel.html')
