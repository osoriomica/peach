"""peach URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import include, path

# Import sitemaps
from about.sitemaps import AboutSitemap
from game.sitemaps import GameSitemap
from home.sitemaps import HomeSitemap
from profiles.sitemaps import ProfileSitemap
from subscriptions.sitemaps import SubscriptionsSitemap

# Import the robots.txt view
from home.views import robots_txt

# Define the sitemaps dictionary
sitemaps = {
    'about': AboutSitemap,
    'home': HomeSitemap,
    'game': GameSitemap,
    'profiles': ProfileSitemap,
    'subscriptions': SubscriptionsSitemap,
}

urlpatterns = [
    path('about/', include('about.urls'), name='about-urls'),
    path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('game/', include('game.urls'), name='game-urls'),
    path('profile/', include('profiles.urls'), name='profile-urls'),
    path('subscriptions/', include('subscriptions.urls')),
    path('', include('home.urls')),

    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
    path('robots.txt', robots_txt, name='robots_txt'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
