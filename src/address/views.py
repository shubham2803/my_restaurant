from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
import json
from .models import Address, AddressList
from .forms import AddAddress
from django.db.models import Count
# Create your views here.


def addAddressView(request):
    if request.method == "POST":
        try:
            user = request.user
            print(user)

            addressList, created = AddressList.objects.get_or_create(customer=user)
            print(addressList)
            print(list(addressList.address.all()))
            data = json.loads(request.body)
            print('Received data to add new address: ',data)

            newAddress = Address.objects.create(
                label=data["address"]["label"],
                line1=data["address"]["line1"],
                area=data["address"]["area"],
                city=data["address"]["city"],
                state=data["address"]["state"],
                pinCode=data["address"]["pincode"],
                country=data["address"]["country"],
            )

            addressList.address.add(newAddress)

            print('New Address: ', newAddress, 'has been to address list: ', addressList, 'for customer:', user)
            return JsonResponse({'message': f'Address added for {user}'}, safe=False)
        except:
            user = request.user
            print('except', user)

            addressList, created = AddressList.objects.get_or_create(customer=user)

            form = AddAddress(request.POST)
            if form.is_valid():
                newAddress = form.save()
                addressList.address.add(newAddress)
                print('except', newAddress, addressList)
                return redirect('home:index')
    form = AddAddress()
    return render(request, 'address/newaddress.html', {'form': form})


def editAddress(request, id):
    print(Address.objects.get(id=int(id)))

    if request.method == "GET":
        address = {}
        customer = request.user
        addressList = AddressList.objects.get(customer=customer)

        for item in list(addressList.address.all()):
            if item.id == int(id):
                address["id"] = item.id
                address["label"] = item.label
                address["line1"] = item.line1
                address["area"] = item.area
                address["city"] = item.city
                address["state"] = item.state
                address["pinCode"] = item.pinCode
                address["country"] = item.country
        return JsonResponse([address], safe=False)

    if request.method == "POST":
        customer = request.user
        addressList = AddressList.objects.get(customer=customer)
        data = json.loads(request.body)
        print(data["address"]["line1"])
        for item in list(addressList.address.all()):
            if str(item.id) == data["address"]["id"]:
                print('item id is', item.id, data["address"]["id"])
                address = Address.objects.get(id=data["address"]["id"])
                address.label = data["address"]["label"]
                address.line1 = data["address"]["line1"]
                address.area = data["address"]["area"]
                address.city = data["address"]["city"]
                address.state = data["address"]["state"]
                address.pinCode = data["address"]["pinCode"]
                address.country = data["address"]["country"]
                address.save()
                print('edited address is: ', address)

        return JsonResponse({'message': f'Address edited for {request.user}'}, safe=False)


def deleteAddress(request, id):
    if request.method == "GET":
        address = {}
        customer = request.user
        addressList = AddressList.objects.get(customer=customer)

        for item in list(addressList.address.all()):
            if item.id == int(id):
                Address.objects.filter(id=id).delete()

    return JsonResponse({'message': f'Address deleted for {request.user}'}, safe=False)