import json
from copy import copy

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from .models import Recipe, Step, Ingredient
from .serializers import RecipeSerializer, StepSerializer, IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def create(self, request, *args, **kwargs):
        new_data = copy(request.data)
        new_data['steps'] = json.loads(request.data['steps'])
        new_data['ingredients'] = json.loads(request.data['ingredients'])

        serializer = self.get_serializer(data=new_data)
        serializer.is_valid(raise_exception=True)

        # Validation of ingredients and steps before recipe db entry creation
        serializer_list = []

        for step in new_data['steps']:
            step_serializer = StepSerializer(data=step)
            step_serializer.is_valid(raise_exception=True)
            serializer_list.append(step_serializer)

        for ingredient in new_data['ingredients']:
            ingredient_serializer = IngredientSerializer(data=ingredient)
            ingredient_serializer.is_valid(raise_exception=True)
            serializer_list.append(ingredient_serializer)

        self.perform_create(serializer)

        # Creation of ingredients and steps
        for ser in serializer_list:
            ser.save(recipe_id=serializer.data['id'])

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        new_data = copy(request.data)
        new_data['steps'] = json.loads(request.data['steps'])
        new_data['ingredients'] = json.loads(request.data['ingredients'])

        # both ingredient and steps code looks the same, so iteration will decrease amount of code needed
        for data_set in [{"serializer": StepSerializer,
                          "request_data": new_data['steps'],
                          "model": Step},

                         {"serializer": IngredientSerializer,
                          "request_data": new_data['ingredients'],
                          "model": Ingredient}]:

            serializer_lists = []

            # get all ids for objects from request data
            request_data_ids = [data['id'] for data in data_set['request_data'] if "id" in data]
            db_objects_list = data_set['model'].objects.filter(recipe_id=instance.id)

            # list contains only objects that are in database and in request data
            objects_to_update = db_objects_list.filter(id__in=request_data_ids)

            # list contains objects which found in database but it's id are not present in request data
            objects_to_delete = db_objects_list.exclude(
                id__in=request_data_ids)

            # list contains objects from request data that are not having and any id's assigned
            # which means it was never created
            objects_to_create = [data for data in data_set['request_data'] if "id" not in data]

            for update_object in objects_to_update:
                update_data = next(data for data in new_data['steps'] if data['id'] == update_object.id)
                update_serializer = data_set['serializer'](update_object, data=update_data, partial=True)
                update_serializer.is_valid(raise_exception=True)
                serializer_lists.append(update_serializer)

            for create_object in objects_to_create:
                create_serializer = data_set['serializer'](data=create_object)
                create_serializer.is_valid(raise_exception=True)
                serializer_lists.append(create_serializer)

            objects_to_delete.delete()

            self.perform_update(serializer)

            for ser in serializer_lists:
                if "id" in ser.validated_data:
                    ser.save()
                else:
                    ser.save(recipe=instance)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class StepsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StepSerializer
    queryset = Step.objects.all()


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
