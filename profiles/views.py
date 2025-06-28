import stripe
from django.conf import settings
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import stripe.error
from subscriptions.models import Subscription
from django.contrib import messages


stripe.api_key = settings.STRIPE_SECRET_KEY


@login_required
def profile(request):
    """
    Display the user's profile.
    """
    profile = request.user.profile
    subscription = Subscription.objects.filter(user=request.user).first()

    if request.method == 'POST':
        # handle change of username
        if 'username' in request.POST:
            new_username = request.POST.get('username')
            if new_username and new_username != request.user.username:
                request.user.username = new_username
                request.user.save()
                messages.success(request, "Username updated succesfully.")
        # handle subscription cancellation
        elif 'cancel_subscription' in request.POST and subscription:
            try:
                stripe.Subscription.modify(
                    subscription.stripe_subscription_id,
                    cancel_at_period_end=True
                )
                messages.success(
                    request,
                    "Subscription will cancel at end of billing period")
            except stripe.error.StripeError as e:
                messages.error(request, f"Stripe error: {str(e)}")

    context = {
        'profile': profile,
        'subscription': subscription,
    }

    return render(request, 'profiles/profile.html', context)
