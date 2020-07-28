from django.db import models

from accounts.models import Customer

from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


class Reservation(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=50, default='',)
    phone = PhoneNumberField()
    date = models.DateField()
    time = models.TimeField()
    persons = models.IntegerField()

    def __str__(self):
        return self.name
