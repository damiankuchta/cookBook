from rest_framework.parsers import FileUploadParser

from .models import Recipe, Step, Ingredient
from .serializers import RecipeSerializer, StepSerializer, IngredientSerializer
from rest_framework import viewsets

from rest_framework import status
from rest_framework.response import Response

class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




class StepsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StepSerializer
    queryset = Step.objects.all()


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
