# Generated by Django 3.1.4 on 2021-01-15 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travel_app', '0003_favoritelist_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favoritelist',
            name='price',
        ),
    ]
