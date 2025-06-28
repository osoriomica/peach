from datetime import datetime
from django.utils.timezone import make_aware
from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import Subscription
import stripe


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
        except User.DoesNotExist:
            print(
                f'Checkout completed for unknown email: {customer_email}'
                )
            return HttpResponse(status=404)

        # Fetch Stripe subscription details
        stripe_sub = stripe.Subscription.retrieve(subscription_id)

        item_data = stripe_sub['items']['data'][0]
        start_date = make_aware(datetime.fromtimestamp(item_data[
            'current_period_start'
            ]))
        period_end = make_aware(datetime.fromtimestamp(item_data[
            'current_period_end'
            ]))
        plan_interval = item_data['price']['recurring']['interval']
        cancel_at_period_end = stripe_sub.get('cancel_at_period_end', False)

        sub, created = Subscription.objects.get_or_create(
            user=user,
            defaults={
                'stripe_customer_id': customer_id,
                'stripe_subscription_id': subscription_id,
                'is_active': True,
                'start_date': start_date,
                'current_period_end': period_end,
                'plan_interval': plan_interval,
                'cancel_at_period_end': cancel_at_period_end,
            }
        )

        if not created:
            sub.stripe_customer_id = customer_id
            sub.stripe_subscription_id = subscription_id
            sub.start_date = start_date
            sub.current_period_end = period_end
            sub.plan_interval = plan_interval
            sub.cancel_at_period_end = cancel_at_period_end
            sub.is_active = True
            sub.save()
        print(f'Subscription activated for user {user.email}')

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

    def handle_customer_subscription_updated(self, event):
        subscription_data = event['data']['object']
        stripe_customer_id = subscription_data.get('customer')

        sub = Subscription.objects.filter(
            stripe_customer_id=stripe_customer_id).first()
        if sub:
            period_end_ts = subscription_data.get('current_period_end')
            if period_end_ts:
                sub.current_period_end = make_aware(
                    datetime.fromtimestamp(period_end_ts))

            try:
                sub.plan_interval = subscription_data[
                    'items']['data'][0]['price']['recurring']['interval']
            except (KeyError, IndexError, TypeError):
                pass

            # update cancellation intent
            sub.cancel_at_period_end = subscription_data.get(
                'cancel_at_period_end', False)
            sub.save()

        return HttpResponse(status=200)
