from django.shortcuts import render
from .models import Restraunt, Menu, Branch, Dish, Category
from order.models import OrderItem, Order, Customer

# Create your views here.


def homePageView(request):
    menu = Menu.objects.all()
    dishes = Dish.objects.all()
    main_ = Dish.objects.filter(type='Main')
    dessert_ = Dish.objects.filter(type='Dessert')
    starter_ = Dish.objects.filter(type='Starter')

    context = {
        'menu': menu,
        'dishes': dishes,
        'main_': main_,
        'dessert_': dessert_,
        'starter_': starter_
    }

    return render(request, 'home/index.html', context)


def menuPageView(request):
    dishes = Dish.objects.all()
    dish_types = []
    main_ = Dish.objects.filter(type='Main')
    dessert_ = Dish.objects.filter(type='Dessert')
    starter_ = Dish.objects.filter(type='Starter')

    for dish in dishes:
        if dish.type not in dish_types:
            dish_types.append(dish.type)


    context = {
        'dishes': dishes,
        'dish_types' : dish_types,
    }

    return render(request, 'home/menu.html', context)


def checkOutPageView(request):
    customer = request.user
    order = Order.objects.get(customer=customer)

    dishDict = {}
    dishList = []

    if request.method == "GET":
        orderItem = OrderItem.objects.filter(order=order)
        for item in list(orderItem):
            dishId = item.orderItem.id
            dishName = item.orderItem.dish
            dishCost = item.orderItem.cost
            dishQuantity = item.quantity
            dishTotal = item.get_total

            dishDict["dishId"] = dishId
            dishDict["dishName"] = dishName
            dishDict["dishCost"] = dishCost
            dishDict["dishQuantity"] = dishQuantity
            dishDict["dishTotal"] = dishTotal

            # print("dishId : ", dishId, " dishName : ", dishName, " dishCost : ", dishCost, " dishQuantity : ", dishQuantity)
            dishList.append(dishDict)
            dishDict = {}
        dishDict["totalBill"] = order.get_bill
        dishList.append(dishDict)

        print(dishList)
    return render(request, 'home/checkout.html', { 'dishes' : dishList })






