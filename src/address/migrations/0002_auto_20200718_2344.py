# Generated by Django 3.0.6 on 2020-07-18 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='addresslist',
            name='label',
        ),
        migrations.AddField(
            model_name='address',
            name='label',
            field=models.CharField(default='home', max_length=20),
        ),
    ]
