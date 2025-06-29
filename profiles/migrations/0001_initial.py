# Generated by Django 3.2.25 on 2025-06-28 12:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('subscriptions', '0004_auto_20250622_1915'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0)),
                ('level', models.CharField(default='Unknown', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('subscription', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='subscriptions.subscription')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
