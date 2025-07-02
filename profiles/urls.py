from . import views
from django.urls import path


urlpatterns = [
    path('', views.profile, name='profile'),
    path('update/', views.update_profile_image,
         name='update_profile_image'),
    path('delete/', views.delete_profile_image,
         name='delete_profile_image'),
]
