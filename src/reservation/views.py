from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib import messages

from .models import Reservation
from .forms import BookingForm

# Create your views here.


def reservationView(request):
    user = request.user
    if user.is_authenticated:
        reservation = None

        if request.method == "POST":
            form = BookingForm(request.POST)
            print(form.is_valid())
            if form.is_valid():
                temp = form.save(commit=False)
                temp.customer = request.user  # add the logged in user, as the
                # author
                temp.save()
                print('temp:', temp)
                form = BookingForm()
                messages.success(request, f'Table reserved for {temp.date} at {temp.time}')
                return HttpResponseRedirect('/reservation/')
        else:
            form = BookingForm()
        context = {
            'reservation': reservation,
            'form': form,
        }

    return render(request, 'reservation/reservation.html', context)
