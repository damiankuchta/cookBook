import django_filters
from django.db.models import Count
from .models import Recipe


class CustomOrderingFilter(django_filters.OrderingFilter):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.extra['choices'] += [
            ('number_of_steps', 'Steps'),
            ('-number_of_steps', 'Steps (descending)'),

            ('number_of_ingredients', 'Ingredients'),
            ('-number_of_ingredients', 'Ingredients (descending)'),
        ]

    def filter(self, qs, value):

        if value is None:
            return super().filter(qs, value)

        # OrderingFilter is CSV-based, so `value` is a list
        if any(v in ['number_of_steps', '-number_of_steps'] for v in value):
            return Recipe.objects.annotate(number_of_steps=Count('steps')).order_by(value[0])

        if any(v in ['number_of_ingredients', '-number_of_ingredients'] for v in value):
            return Recipe.objects.annotate(number_of_ingredients=Count('ingredients')).order_by(value[0])

        return super().filter(qs, value)


class RecipeFilter(django_filters.FilterSet):
    ordering = CustomOrderingFilter(
        fields=(('title', 'title'), ('created_timestamp', 'created_timestamp'),
                ('last_update_timestamp', 'last_update_timestamp'))
    )


