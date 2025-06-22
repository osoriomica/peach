from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import Subscription


class Stripe_Webhook_Handler:
    """
    Handle Stripe webhooks
    """
    def __init__(self, request):
        self.request = request

    def handle_event(self, event):
        """
        fallback handler for generic/unknown/unxepected events
        """
        return HttpResponse(
            content=f'Unhandled Webhook received: {event["type"]}',
            status=200)

    def handle_payment_intent_succeeded(self, event):
        """
        Handle the payment_intent.succeeded webhook from Stripe
        """
        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200)

    def handle_payment_intent_failed(self, event):
        """
        Handle the payment_intent.payment_failed webhook from Stripe
        """
        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200)

    def handle_checkout_session_completed(self, event):
        """
        Handle checkout.session.completed to activate user subscription
        """
        session = event['data']['object']
        customer_email = session.get('customer_email') or (
            session.get('customer_details', {}).get('email')
            )
        customer_id = session.get('customer')
        subscription_id = session.get('subscription')

        if not customer_email:
            print('Checkout session completed without a customer_email')
            return HttpResponse(status=400)

        try:
            user = User.objects.get(email=customer_email)

            sub, created = Subscription.objects.get_or_create(
                user=user,
                defaults={
                    'stripe_customer_id': customer_id,
                    'stripe_subscription_id': subscription_id,
                    'is_active': True
                }
            )

            if not created:
                sub.stripe_customer_id = customer_id
                sub.stripe_subscription_id = subscription_id
                sub.is_active = True
                sub.save()
            print(f'Subscription activated for user {user.email}')

        except User.DoesNotExist:
            print(
                f'Checkout completed for unknown email: {customer_email}'
                )
            return HttpResponse(status=404)

        return HttpResponse(
            content=f'Webhook handled: {event["type"]}',
            status=200)

    def handle_customer_subscription_deleted(self, event):
        """
        Handle customer.subscription.deleted to deactivate user subscription
        """
        sub_data = event['data']['object']
        customer_id = sub_data.get('customer')

        try:
            sub = Subscription.objects.get(stripe_customer_id=customer_id)
            sub.is_active = False
            sub.save()
        except Subscription.DoesNotExist:
            pass

        return HttpResponse(
            content=f'Webhook handled: {event["type"]}',
            status=200
            )
