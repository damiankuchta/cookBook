from django.core.validators import MinLengthValidator
from django.db import models
from multiselectfield import MultiSelectField

UNIT_CHOICES = (
    ('KG', 'KG'),
    ('g', 'g'),
    ('L', 'L'),
    ('ml', 'ml'),
    ('units', 'units')
)

RECIPE_TYPES = (
    ('dinner', 'dinner'),
    ('breakfast', 'breakfast'),
    ('salad', 'salad'),
    ('dessert', 'dessert'),
    ('snack', 'snack'),
)


# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=32, validators=[MinLengthValidator(3)])
    description = models.CharField(max_length=200, validators=[MinLengthValidator(10)])
    picture_file = models.ImageField(upload_to='pictures', null=True, blank=True)
    last_update_timestamp = models.DateTimeField(auto_now_add=True)
    created_timestamp = models.DateTimeField(auto_now=True)
    types = MultiSelectField(choices=RECIPE_TYPES, null=True)


class Ingredient(models.Model):
    unit = models.CharField(choices=UNIT_CHOICES, max_length=5)
    amount = models.FloatField()
    product = models.CharField(max_length=32, validators=[MinLengthValidator(2)])
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    index = models.IntegerField()


class Step(models.Model):
    step = models.CharField(max_length=200, validators=[MinLengthValidator(2)])
    index = models.IntegerField()
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='steps')
#   todo: make sure step_number is in sequence
