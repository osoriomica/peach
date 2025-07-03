from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class AboutSitemap(Sitemap):
    changefreq = "yearly"
    priority = 0.5

    def items(self):
        return ['about']

    def location(self, item):
        return reverse(item)
