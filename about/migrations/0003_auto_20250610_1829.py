# Generated by Django 3.2.25 on 2025-06-10 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0002_about_about_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='about',
            options={'verbose_name': 'About', 'verbose_name_plural': 'About'},
        ),
        migrations.AddField(
            model_name='about',
            name='about_image_url',
            field=models.URLField(blank=True, max_length=1024, null=True),
        ),
    ]
