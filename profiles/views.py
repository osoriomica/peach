from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

import stripe
import stripe.error

from .models import UserProfile
from game.models import GameScore
from subscriptions.models import Subscription
from cloudinary import uploader


stripe.api_key = settings.STRIPE_SECRET_KEY


@login_required
def profile(request):
    """
    Display the user's profile.
    """
    profile = get_object_or_404(UserProfile, user=request.user)
    is_default_image = str(profile.profile_image) == 'static/media/default'
    subscription = Subscription.objects.filter(user=request.user).first()

    high_score = GameScore.objects.filter(user=profile.user).order_by(
        '-score', '-created_at').first()

    if request.method == 'POST':
        # handle subscription cancellation
        if 'cancel_subscription' in request.POST and subscription:
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
        'high_score': high_score,
        'is_default_image': is_default_image,
    }

    return render(request, 'profiles/profile.html', context)


# User profile view for displaying profile image
@login_required
def update_profile_image(request):
    """
    Update the user's profile image.
    """
    profile = get_object_or_404(UserProfile, user=request.user)

    if request.method == 'POST' and request.FILES.get('profile_image'):
        profile.profile_image = request.FILES['profile_image']
        profile.save()
        messages.success(request, "Profile image updated successfully.")

    return redirect('profile')


@login_required
def delete_profile_image(request):
    profile = get_object_or_404(UserProfile, user=request.user)

    if (
        profile.profile_image and
        profile.profile_image.public_id != 'static/media/default'
    ):
        # Deletes from Cloudinary
        uploader.destroy(profile.profile_image.public_id)
        # Clear the profile image field
        profile.profile_image = None
        profile.save()
        messages.success(request, "Profile image deleted successfully.")

    # Reassign default image
    if not profile.profile_image:
        profile.profile_image = 'static/media/default'
        profile.save()

    return redirect('profile')
