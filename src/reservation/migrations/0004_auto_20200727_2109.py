# Generated by Django 3.0.6 on 2020-07-27 15:39

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0003_auto_20200724_2333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None),
        ),
    ]
