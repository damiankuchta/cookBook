# Generated by Django 4.0.5 on 2022-06-18 16:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_rename_step_number_step_index_ingredient_index_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='step',
            old_name='description',
            new_name='step',
        ),
    ]