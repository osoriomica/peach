from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class ProfileSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.4

    def items(self):
        return ['profile']

    def location(self, item):
        return reverse(item)
