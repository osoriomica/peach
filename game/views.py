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
        try:
            data = json.loads(request.body)
            score = data.get("score", 0)
            level = data.get("level", "unkown")

            if score is None:
                return JsonResponse(
                    {"error": "Score not provided"},
                    status=400
                )

            if request.user.is_authenticated:
                GameScore.objects.create(
                    user=request.user, score=score, level=level
                    )
                
                # store current score in session
                request.session['current_score'] = score
                request.session['current_level'] = level

                return JsonResponse(
                    {"status": "success", "score": score, "level": level}
                )
            else:
                return JsonResponse(
                    {"status": "Anonymous user",
                     "message": "Anonymous score not saved"}
                    )

        except Exception:
            return JsonResponse({"error": "An unexpected error occurred."
                                "Please try again later."}, status=405)

    return JsonResponse({"error": "Invalid request method"}, status=500)


def world1(request):
    """
    Render the free Peach game page. No authentication needed.
    """
    return render(request, 'game/world1.html', {'world1': 'world1'},)


@subscription_required
def world2(request):
    """
    Render the paid game for subscribed and logged-in users.
    """
    current_score = request.session.get('current_score', 0)
    current_level = request.session.get('current_level')
    return render(request, 'game/world2.html', {
        'world2': 'world2',
        'previous_score': current_score,
        'previous_level': current_level,
        })
