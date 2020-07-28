from django.contrib import admin
from .models import Order, OrderItem
# Register your models here.

admin.site.register(OrderItem)


class OrderItemsInLine(admin.TabularInline):
    model = OrderItem


class OrderAdmin(admin.ModelAdmin):
    inlines = [
        OrderItemsInLine,
    ]


admin.site.register(Order, OrderAdmin)