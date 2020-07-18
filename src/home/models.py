from django.db import models
from django.contrib.auth.models import User
from accounts.models import Customer
# Create your models here.


class Restraunt(models.Model):
    branch = models.ForeignKey('Branch', on_delete=models.CASCADE)
    menu = models.ForeignKey('Menu', on_delete=models.DO_NOTHING)
    orders = models.ForeignKey(to='order.Order', on_delete=models.DO_NOTHING)
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)


class Menu(models.Model):
    dish = models.ForeignKey('Dish', on_delete=models.DO_NOTHING)


class Branch(models.Model):
    id = models.CharField(null=True,max_length=1)
    name = models.CharField(primary_key=True, max_length=20)
    area = models.CharField(max_length=40, null=True)
    city = models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=50, null=True)
    state = models.CharField(max_length=50, null=True)
    pinCode = models.CharField(max_length=6, null=True)
    isOpen = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Dish(models.Model):
    dish = models.CharField(max_length=30, null=True)
    category = models.ForeignKey('Category', on_delete=models.DO_NOTHING)
    cost = models.IntegerField()
    availability = models.BooleanField(default=False)
    type = models.CharField(max_length=30, null=True)
    image = models.ImageField(blank=True, null=True)
    ingredients = models.ManyToManyField('FoodItem')

    def __str__(self):
        return self.dish

    @property
    def imageUrl(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url


class FoodItem(models.Model):
    name = models.CharField(max_length=50)
    is_veg = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=30, null=True)
    origin_text = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.name
