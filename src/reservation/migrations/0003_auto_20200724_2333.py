# Generated by Django 3.0.6 on 2020-07-24 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0002_reservation_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='phone',
            field=models.IntegerField(null=True),
        ),
    ]
