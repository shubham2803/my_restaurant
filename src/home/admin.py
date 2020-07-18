from django.contrib import admin
from .models import Restraunt, Branch, Menu, Dish, Category, FoodItem

# Register your models here.


class BranchAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'area',
        'city',
        'country',
        'state',
        'pinCode',
        'isOpen'
    ]


class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'origin_text'
    ]


class DishAdmin(admin.ModelAdmin):
    list_display = [
        'dish',
        'category',
        'cost',
        'availability'
    ]


class MenuAdmin(admin.ModelAdmin):
    model = Menu
    list_display = [
        'dish',
        'get_category'
    ]

    def get_category(self, obj):
        return obj.dish.category


class FoodItemAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'is_veg'
    ]


admin.site.register(Restraunt)
admin.site.register(Menu, MenuAdmin)
admin.site.register(Branch, BranchAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(FoodItem, FoodItemAdmin)