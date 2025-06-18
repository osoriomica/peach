from django.shortcuts import render


# Create your views here.
def subscription_required_view(request):
    return render(request, 'subscriptions/subscribe.html')
