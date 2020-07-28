# Generated by Django 3.0.6 on 2020-07-28 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_order_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'PENDING'), ('payed', 'PAYED'), ('preparing', 'PREPARING'), ('delivered', 'DELIVERED')], default='pending', max_length=9),
        ),
    ]
