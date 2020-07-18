from django.db import models
from accounts.models import Customer
# Create your models here.


class AddressList(models.Model):
    label = models.CharField(max_length=20, default='home')
    address = models.ManyToManyField('Address')
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)


class Address(models.Model):
    # label = models.CharField(max_length=15, default='Home')
    # buyer = models.ForeignKey('Customer', on_delete=models.CASCADE, default=None)
    isDefault = models.BooleanField(default=False)
    line1 = models.CharField(max_length=50, null=True)
    area = models.CharField(max_length=50, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    pinCode = models.CharField(max_length=6)
    country = models.CharField(max_length=50)

    # def __str__(self):
    #     return str(self.id) + '/' + str(self.buyer.id) + '-' + self.buyer.firstName