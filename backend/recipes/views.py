import json
from copy import deepcopy

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from .models import Recipe, Step, Ingredient
from .serializers import RecipeSerializer, StepSerializer, IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def create(self, request, *args, **kwargs):
        new_data = deepcopy(request.data)
        new_data['steps'] = json.loads(request.data['steps'])
        new_data['ingredients'] = json.loads(request.data['ingredients'])

        serializer = self.get_serializer(data=new_data)
        serializer.is_valid(raise_exception=True)

        # Validation of ingredients and steps before recipe db entry creation
        steps_serializers = []
        ingredients_serializers = []

        for step in new_data['steps']:
            step_serializer = StepSerializer(data=step['props'])
            step_serializer.is_valid(raise_exception=True)
            steps_serializers.append(step_serializer)

        for ingredient in new_data['ingredients']:
            ingredient_serializer = IngredientSerializer(data=ingredient['props'])
            ingredient_serializer.is_valid(raise_exception=True)
            ingredients_serializers.append(ingredient_serializer)

        self.perform_create(serializer)

        # todo: assign object without making a DB query?
        recipe_db_object = Recipe.objects.get(id=serializer.data['id'])

        # Creation of ingredients and steps
        for step in steps_serializers:
            step.save(recipe=recipe_db_object)

        for ingredient in ingredients_serializers:
            ingredient.save(recipe=recipe_db_object)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class StepsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StepSerializer
    queryset = Step.objects.all()


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
