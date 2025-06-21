import stripe
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Subscription
from django.contrib.auth.models import User
from subscriptions.webhook_handler import Stripe_Webhook_Handler

stripe.api_key = settings.STRIPE_SECRET_KEY


# Show princing table page
def subscription_required_view(request):
    return render(request, 'subscriptions/subscribe.html', {
        'STRIPE_PUBLIC_KEY': settings.STRIPE_PUBLIC_KEY
    })


# Succes and cancel pages
def subscription_success(request):
    """
    Handle successful subscription
    """
    return render(request, 'subscriptions/success.html')


def subscription_cancel(request):
    """
    Handle cancelled subscription
    """
    return render(request, 'subscriptions/cancel.html')


# Stripe webhook handler
@require_POST
@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
            )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        # Invalid Signature
        return HttpResponse(status=400)
    except Exception as e:
        return HttpResponse(content=e, status=400)

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_email = session.get('customer_email')
        customer_id = session.get('customer')

        if customer_email:
            try:
                user = User.objects.get(email=customer_email)
                subscription, created = Subscription.objects.get_or_create(
                    user=user)
                subscription.stripe_customer_id = customer_id
                subscription.is_active = True
                subscription.save()
            except User.DoesNotExist:
                pass

    elif event['type'] == 'customer.subscription.deleted':
        sub = event['data']['object']
        customer_id = sub.get('customer')

        Subscription.objects.filter(
            stripe_customer_id=customer_id).update(is_active=False)

    print('Success!')
    return HttpResponse(status=200)
