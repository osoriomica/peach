from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render, redirect
import stripe.error
from .models import Subscription

import stripe
from .webhook_handler import Stripe_Webhook_Handler


# Show princing table page
@login_required
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


@login_required
def reactivate_subscription(request):
    try:
        subscription = Subscription.objects.get(user=request.user)

        if not subscription.is_active:
            messages.error(
                request,
                "Your subscription is no longer active. Please resubscribe")
            return redirect("profile")

        if not subscription.cancel_at_period_end:
            messages.info(request, "Your subscription is already active.")
            return redirect("profile")

        # reactivate with Stripe
        stripe.Subscription.modify(
            subscription.stripe_subscription_id,
            cancel_at_period_end=False
        )

        # update in db
        subscription.cancel_at_period_end = False
        subscription.save()

        messages.success(request, "Your Subscription has been reactivated.")
    except Subscription.DoesNotExist:
        messages.error(request, "You do not have an active subscription.")
    except stripe.error.StripeError as e:
        messages.error(request,
                       f"Stripe encountered an error: {e.user_message}")
    return redirect("profile")


# Stripe webhook handler
@require_POST
@csrf_exempt
def stripe_webhook(request):
    """
    Listen for webhooks from Stripe
    """
    webhook_secret = settings.STRIPE_WEBHOOK_SECRET
    stripe.api_key = settings.STRIPE_SECRET_KEY

    # get the webhook data and verify its signature
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
            )
    except ValueError:
        # Invalid payload
        return HttpResponse(status=400)

    except stripe.error.SignatureVerificationError:
        # Invalid Signature
        return HttpResponse(status=400)

    except Exception as e:
        return HttpResponse(content=e, status=400)

    # Set up a webhook handler
    handler = Stripe_Webhook_Handler(request)

    event_map = {
        'payment_intent.succeeded': handler.handle_payment_intent_succeeded,
        'payment_intent.payment_failed': handler.handle_payment_intent_failed,
        'checkout.session.completed':
        handler.handle_checkout_session_completed,
        'customer.subscription.deleted':
        handler.handle_customer_subscription_deleted,
        'customer.subscription.updated':
        handler.handle_customer_subscription_updated,
    }

    event_type = event['type']
    event_handler = event_map.get(event_type, handler.handle_event)
    return event_handler(event)
