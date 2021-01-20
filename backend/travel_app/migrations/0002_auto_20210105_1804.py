# Generated by Django 3.1.4 on 2021-01-05 18:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favoritelist',
            name='destination',
            field=models.CharField(max_length=3, validators=[django.core.validators.MinLengthValidator(3, message='This field cannot be blank')]),
        ),
        migrations.AlterField(
            model_name='favoritelist',
            name='origin',
            field=models.CharField(max_length=3, validators=[django.core.validators.MinLengthValidator(3, message='This field cannot be blank')]),
        ),
        migrations.AlterField(
            model_name='favoritelist',
            name='return_date',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
