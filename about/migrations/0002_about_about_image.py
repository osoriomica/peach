# Generated by Django 3.2.25 on 2025-06-10 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='about',
            name='about_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
