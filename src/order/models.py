from django.db import models
from home.models import Dish, Branch
from accounts.models import Customer
from address.models import Address, AddressList

# Create your models here.


class Order(models.Model):

    status_choices = [
        ('pending', 'PENDING'),
        ('initiated', 'INITIATED'),
        ('payed', 'PAYED'),
        ('preparing', 'PREPARING'),
        ('delivered', 'DELIVERED')
    ]
    status = models.CharField(max_length=9, choices=status_choices, default='pending')
    is_complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=10, null=True, blank=True)
    # branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True )
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)

    @property
    def get_bill(self):
        return sum(item.get_total for item in self.orderitem_set.all())

    @property
    def get_quantity(self):
        return sum(item.quantity for item in self.orderitem_set.all())


class OrderItem(models.Model):
    orderItem = models.ForeignKey(Dish, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0)


    @property
    def get_total(self):
        return self.orderItem.cost * self.quantity

    def __str__(self):
        return self.orderItem.dish

