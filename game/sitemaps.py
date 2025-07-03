from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class GameSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return ['world1']

    def location(self, item):
        return reverse(item)
