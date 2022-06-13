from django.db import models
from django.core.validators import MinLengthValidator

unit_choices = (
    ('KG', 'KG'),
    ('g', 'g'),
    ('L', 'L'),
    ('ml', 'ml'),
    ('units', 'units')
)


# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=32, validators=[MinLengthValidator(3)])
    description = models.CharField(max_length=200, validators=[MinLengthValidator(10)])
    picture_file = models.ImageField(upload_to='pictures', null=True, blank=True)
    last_update_timestamp = models.DateTimeField(auto_now_add=True)
    created_timestamp = models.DateTimeField(auto_now=True)


class Ingredient(models.Model):
    unit = models.CharField(choices=unit_choices, max_length=5)
    amount = models.FloatField()
    product = models.CharField(max_length=32, validators=[MinLengthValidator(2)])
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')


class Step(models.Model):
    description = models.CharField(max_length=200, validators=[MinLengthValidator(10)])
    step_number = models.IntegerField()
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='steps')
#   todo: make sure step_number is in sequence
