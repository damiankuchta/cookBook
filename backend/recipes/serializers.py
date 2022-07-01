from rest_framework import serializers

from .models import Recipe, Ingredient, Step


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'amount', 'product', 'unit', 'index']


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'step', 'index']


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    steps = StepSerializer(many=True, read_only=True)
    types = serializers.CharField()

    class Meta:
        model = Recipe
        fields = ['id', 'picture_file', 'title', 'description', 'ingredients', 'steps', 'types']








