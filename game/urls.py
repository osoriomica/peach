from django.urls import path
from . import views
from .views import save_score

urlpatterns = [
    path('world1/', views.world1, name='world1'),
    path('world2/', views.world2, name='world2'),
    path("api/save-score", save_score, name="save_score"),
]
