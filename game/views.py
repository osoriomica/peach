from django.shortcuts import render


# Create your views here.
def game(request):
    """
    Render the Peach game page.
    """
    return render(request, 'game/game.html', {'game': 'Peach Game'},)
