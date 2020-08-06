from django.shortcuts import render, redirect, HttpResponseRedirect, HttpResponse
from django.http import JsonResponse
from django.contrib import messages
import razorpay
from django.contrib.auth.decorators import login_required
from .models import Order, OrderItem
from home.models import Restraunt, Menu, Branch, Dish, FoodItem, Category
# Create your views here.

client = razorpay.Client(auth=('rzp_test_7DRR93ecd1hzdM', 'Dyfy8kCYQaYkDRUma72Rbh6I'))


def cartPageView(request):
    order = OrderItem.objects.all()


def addItem(request, id):
    print(id)
    if id < 0:
        dish_id = -1 * id
    else:
        dish_id = id
    customer = request.user
    order, created = Order.objects.get_or_create(customer=customer, is_complete=False)

    if request.method == 'GET':
        try:
            branch = Branch.objects.filter(name='Branch_1')
            item = Dish.objects.get(id=dish_id)
            #print(item)

            # create or update current order and quantity of new dishes
            orderItem, created = OrderItem.objects.get_or_create(order=order, orderItem=item)
            dishTotal = orderItem.get_total     # total price of dishes : quantity * dishes cost

            if id < 0:
                orderItem.quantity -= 1
                orderItem.save()
                print("removed")
            else:
                orderItem.quantity += 1
                orderItem.save()
                print('added')

            if orderItem.quantity <= 0:
                Order.delete(orderItem)
                print('deleted')
            #print('QUANTITY', order.orderitem_set.all())
        except:
            pass
        finally:
            # fetch all the dishes in current order from OrderItem Table/ Model
            orderItems = OrderItem.objects.values().filter(order=order)
            #print(list(orderItems))
            orderedDishDict = {}
            orderedDishDictList = []

            for item in list(orderItems):
                dishId = item["orderItem_id"]
                dish = list(Dish.objects.values().filter(id=dishId))
                dish = dish[0]

                orderedDishDict["dishId"] = dishId

                dishName = dish["dish"]
                orderedDishDict["dishName"] = dishName

                dishCost = dish["cost"]
                orderedDishDict["dishCost"] = dishCost

                dishAvailability = dish["availability"]
                orderedDishDict["dishAvailability"] = dishAvailability

                dishType = dish["type"]
                orderedDishDict["dishType"] = dishType

                dishQuantity = item["quantity"]
                orderedDishDict["quantity"] = dishQuantity

                dishTotal = OrderItem.objects.get(id = item["id"]).get_total
                orderedDishDict["dishTotal"] = dishTotal

                # print("Dish Name :", dishName)
                # print("Dish Cost :", dishCost)
                # print("Dish Availability :", dishAvailability)
                # print("Dish Type :", dishType)

                orderedDishDictList.append(orderedDishDict)
                orderedDishDict = {}

            print("Order Total :", order.get_bill)
            print(orderedDishDictList)
            orderedDishDictList.append({"orderTotal" : order.get_bill})

            return JsonResponse(orderedDishDictList, safe=False)


def completeOrder(request):
    user = request.user
    context = {}
    if user.is_authenticated:
        order = Order.objects.get(customer=user, is_complete=False)

        response = client.order.create(dict(amount=order.get_bill*100,
                                            currency="INR",
                                            receipt="order_" + str(order.id),
                                            notes={},
                                            payment_capture='0'
                                            ))

        order_id = response['id']
        print(order_id)
        order_status = response['status']

        if order_status == 'created':
            context['order'] = order
            context['price'] = order.get_bill
            context['name'] = user.first_name + user.last_name
            context['phone'] = user.phone_no
            context['email'] = user.email

            context['order_id'] = order_id

            return render(request, 'order/payment.html', context)

            # print('\n\n\nresponse: ',response, type(response))
        return HttpResponse('<h1>Error in  create order function</h1>')


def payment_status(request):
    user = request.user
    context = {}
    order = Order.objects.get(customer=user, is_complete=False)

    response = request.POST

    params_dict = {
        'razorpay_payment_id' : response['razorpay_payment_id'],
        'razorpay_order_id' : response['razorpay_order_id'],
        'razorpay_signature' : response['razorpay_signature']
    }

    # VERIFYING SIGNATURE
    try:
        status = client.utility.verify_payment_signature(params_dict)

        order.is_complete = True
        print(order.id)
        order.save()
        messages.success(request, 'order completed!')
        return render(request, 'order/order_summary.html', {'status': 'Payment Successful'})
    except:
        return render(request, 'order/order_summary.html', {'status': 'Payment Faliure!!!'})