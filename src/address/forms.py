from django import forms

from .models import Address, AddressList


class AddAddress(forms.ModelForm):
    class Meta:
        model = Address
        fields = ('line1', 'area', 'city', 'state', 'pinCode', 'country', 'isDefault')
