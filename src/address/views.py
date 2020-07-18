from django.shortcuts import render, redirect

from .forms import AddAddress
# Create your views here.


def addAddressView(request):
    if request.method == "POST":
        form = AddAddress(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home:index')
    form = AddAddress()
    return render(request, 'address/newaddress.html', {'form': form})
