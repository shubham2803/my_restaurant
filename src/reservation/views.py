from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib import messages

from .models import Reservation
from .forms import BookingForm

import datetime


# Create your views here.


def reservationView(request):
    user = request.user

    past_reservation = []
    today_reservation = []
    future_reservation = []

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

    reservations = Reservation.objects.filter(customer=user)

    for item in reservations:
        if item.date > datetime.date.today():
            future_reservation.append(item)
        elif item.date < datetime.date.today():
            past_reservation.append(item)
        else:
            today_reservation.append(item)

    context = {
        'reservation': reservation,
        'past_reservations': past_reservation,
        'current_reservations': today_reservation,
        'future_reservations': future_reservation,
        'form': form,

    }

    return render(request, 'reservation/reservation.html', context)
