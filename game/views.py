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
        if request.user.is_authenticated:
            try:
                data = json.loads(request.body)
                score = data.get("score", 0)
                level = data.get("level", "unkown")

                GameScore.objects.create(
                    user=request.user,
                    score=score,
                    level=level
                )

                # store current score in session
                request.session['total_score'] = score
                request.session['current_level'] = level

                return JsonResponse({
                    "status": "success",
                    "score": score,
                    "level": level
                })
            except Exception:
                return JsonResponse({"error": "An unexpected error occurred."
                                    "Please try again later."}, status=500)
        else:
            return JsonResponse({
                "status": "Anonymous user",
                "message": "Anonymous score not saved"
            })
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def reset_game(request):
    """Reset the game session for a new game"""
    if request.method == "POST":
        # Clear game-related session data
        request.session.pop('total_score', None)
        request.session.pop('current_level', None)

        return JsonResponse({
            "status": "success",
            "message": "Game session reset"
        })
    return JsonResponse({"error": "Invalid request method"}, status=405)


def world1(request):
    """
    Render the free Peach game page. No authentication needed.
    """
    if request.GET.get('new') == 'true':
        request.session.pop('total_score', None)
        request.session.pop('current_level', None)
        previous_score = 0
    else:
        previous_score = request.session.get('total_score', 0)

    context = {
        'world1': 'world1',
        'previous_score': previous_score,
    }
    return render(request, 'game/world1.html', context)


@subscription_required
def world2(request):
    """
    Render the paid game for subscribed and logged-in users.
    """

    total_score = request.session.get('total_score', 0)
    current_level = request.session.get('current_level')

    context = {
        'world2': 'world2',
        'previous_score': total_score,
        'previous_level': current_level,
    }
    return render(request, 'game/world2.html', context)
