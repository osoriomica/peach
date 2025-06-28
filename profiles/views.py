from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from subscriptions.models import Subscription
from django.contrib import messages


# Create your views here.
@login_required
def profile(request):
    """
    Display the user's profile.
    """
    profile = request.user.profile
    subscription = Subscription.objects.filter(user=request.user).first()

    if request.method == 'POST':
        new_username = request.POST.get('username')
        if new_username and new_username != request.user.username:
            request.user.username = new_username
            request.user.save()
            messages.success(request, "Username updated succesfully.")

    context = {
        'profile': profile,
        'subscription': subscription,
    }

    return render(request, 'profiles/profile.html', context)
