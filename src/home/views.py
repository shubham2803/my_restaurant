from django.shortcuts import render, redirect
from .models import Restraunt, Menu, Branch, Dish, Category
from order.models import OrderItem, Order, Customer
from address.models import Address, AddressList

import razorpay

# Create your views here.

client = razorpay.Client(auth=('rzp_test_7DRR93ecd1hzdM', 'Dyfy8kCYQaYkDRUma72Rbh6I'))


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
        'dish_types': dish_types,
    }

    return render(request, 'home/menu.html', context)




def checkOutPageView(request):
    customer = request.user
    if customer.is_authenticated:
        pass
    else:
        return redirect('user-login')

    try:
        order = Order.objects.get(customer=customer, is_complete=False)
    except:
        return redirect('/menu/')
    dishDict = {}
    dishList = []
    addresses = []
    try:
        addressList = AddressList.objects.get(customer=customer)
        print(addressList.address.all())
        for item in list(addressList.address.all()):
            # print(item.__dict__)
            addresses.append(item)
            # print(item.id)
            # print(item.label.lower().title())
            # print(item.line1)
            # print(item.area.lower().title())
            # print(item.city.lower().title())
            # print(item.state.lower().title())
            # print(item.pinCode)
            # print(item.country.lower().title())
            if item.isDefault:
                order.address = item
                order.save()
    except:
        pass

    if request.method == "GET":
        orderItem = OrderItem.objects.filter(order=order)
        if len(list(orderItem)) == 0:
            return redirect('home:menu')
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
            dishList.append(dishDict)
            dishDict = {}
            # print("dishId : ", dishId, " dishName : ", dishName, " dishCost : ", dishCost, " dishQuantity : ",
            # dishQuantity)
        dishDict["totalBill"] = order.get_bill
        dishList.append(dishDict)

        print(f'\nDishes added to order of {request.user} are : \n{dishList}\n')
    return render(request, 'home/checkout.html', {'addresses': addresses, 'dishes': dishList})
