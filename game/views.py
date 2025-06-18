from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import GameScore
import json
from subscriptions.decorators import subscription_required


# Create your views here.
@csrf_exempt
def save_score(request):
    if request.method == "POST":
        data = json.loads(request.body)
        score = data.get("score", 0)
        user = request.user
        GameScore.objects.create(user=user, score=score)
        return JsonResponse({"status": "success", "score": score})
    return JsonResponse({"error": "Invalid request"}, status=400)


def world1(request):
    """
    Render the free Peach game page.
    """
    return render(request, 'game/world1.html', {'world1': 'world1'},)


@subscription_required
def world2(request):
    """
    Render the paid game for subscribed and logged-in users.
    """
    return render(request, 'game/world2.html', {'world2': 'world2'})
