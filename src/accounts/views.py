from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib import messages

from .models import Customer, CustomerManager
from address.models import AddressList, Address
from reservation.models import Reservation
from order.models import Order, OrderItem

from .forms import CustomerSignUpForm, ChangeProfile, CustomerLogin
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


# Create your views here.


def SignUpView(request):
    if request.method == 'POST':
        form = CustomerSignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return redirect('home:index')
    else:
        form = CustomerSignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})


def logInView(request):
    if request.POST == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}")
                return redirect('/')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})


def profileView(request):
    user = request.user
    context = {}
    if not user.is_authenticated:
        return redirect('login')

    addressList = AddressList.objects.get(customer=user)
    addresses = addressList.address.all()
    orders = Order.objects.filter(customer=user)
    try:
        reservations = Reservation.objects.filter(customer=user)
    except:
        reservations = None

    context = {
        'addresses': addresses,
        'orders': orders,
        'reservations': reservations,
        'user': user,
    }
    return render(request, 'accounts/profile.html', context)


def orderView(request, _id):
    user = request.user
    dishList = []
    dishDict = {}
    context = {}
    if not user.is_authenticated:
        return redirect('login')

    order = Order.objects.get(id=_id)
    orderItems = OrderItem.objects.filter(order)
    address = order.address
    total = order.get_bill

    for item in list(orderItems):
        dish = item.orderItems
        dishDict['name'] = dish.dish
        dishDict['dishCost'] = dish.cost
        dishDict['quantity'] = item.quantity
        dishDict['dishTotal'] = item.get_total

        dishList.append(dishDict)
        dishDict = {}

    context = {
        'dishes': dishList,
        'address': address,
        'total': total,
    }


