from django.shortcuts import redirect
from .models import Subscription


def subscription_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('account_login')

        try:
            sub = Subscription.objects.get(user=request.user)
            if sub.is_active:
                return view_func(request, *args, **kwargs)
        except Subscription.DoesNotExist:
            pass

        return redirect('subscription_required')
    return _wrapped_view
