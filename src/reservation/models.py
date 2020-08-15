from django.db import models

from accounts.models import Customer

from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


class Reservation(models.Model):

    status_choices = [
        ('COM', 'completed'),
        ('CAN', 'cancelled'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=50, default='',)
    phone = PhoneNumberField()
    date = models.DateField()
    time = models.TimeField()
    persons = models.IntegerField()
    status = models.CharField(max_length=15, choices=status_choices)

    def __str__(self):
        return self.name
