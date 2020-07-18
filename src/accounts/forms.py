from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import Customer


class CustomerSignUpForm(forms.ModelForm):

    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta:
        model = Customer
        fields = ('first_name', 'last_name','email', 'date_of_birth', 'gender', 'phone_no')

    def clean_password2(self):
        """
        To check that password and confirmed password area matching
        :return: password2
        """
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match.")
        return password2

    def save(self, commit=True):
        """
        save the password in hashed format
        :param commit:
        :return:
        """
        customer = super().save(commit=False)
        customer.set_password(self.cleaned_data["password1"])
        if commit:
            customer.save()
        return customer


class ChangeProfile(forms.ModelForm):
    """
    this forms is to be used to edit and update customer profile
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = Customer
        fields = ('first_name', 'last_name',
                  'email', 'password', 'date_of_birth',
                  'is_active', 'is_admin',
                  'gender', )

    def clean_password(self):
        return self.initial["password"]


class CustomerLogin(forms.ModelForm):
    class Meta:
        model = Customer
        fields = {'email', 'password'}

