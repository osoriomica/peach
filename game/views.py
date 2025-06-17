from django.shortcuts import render
# from django.contrib.auth.decorators import login_required

# Create your views here.
def game(request):
    """
    Render the Peach game page.
    """
    return render(request, 'game/game.html', {'game': 'Peach Game'},)

# @login_required
# def subscribers_game(request):
#     """
#     Render the paid game for subscribed and logged-in users.
#     """
#     return render(request, 'peach-1.html', {'pro-game': 'pro Game'})
