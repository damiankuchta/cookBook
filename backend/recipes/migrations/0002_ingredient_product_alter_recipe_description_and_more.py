# Generated by Django 4.0.5 on 2022-06-13 15:15

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='product',
            field=models.CharField(default='Product1', max_length=32, validators=[django.core.validators.MinLengthValidator(2)]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='recipe',
            name='description',
            field=models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(10)]),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='title',
            field=models.CharField(max_length=32, validators=[django.core.validators.MinLengthValidator(3)]),
        ),
        migrations.AlterField(
            model_name='step',
            name='description',
            field=models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(10)]),
        ),
    ]