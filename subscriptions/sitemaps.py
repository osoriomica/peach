from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class SubscriptionsSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.3

    def items(self):
        return [
            'subscription_cancel',
            'subscription_required',
            'subscription_success',
            'reactivate_subscription'
        ]

    def location(self, item):
        return reverse(item)
