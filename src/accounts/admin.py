from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import ChangeProfile, CustomerSignUpForm
from .models import Customer
from address.models import AddressList, Address


# Register your models here.


class AddressInLine(admin.TabularInline):
    model = AddressList


class CustomerAdmin(BaseUserAdmin, admin.ModelAdmin):
    form = ChangeProfile
    add_form = CustomerSignUpForm

    list_display = ('first_name', 'last_name',
                    'email', 'password', 'date_of_birth',
                    'is_active', 'is_admin',
                    'gender',)

    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'date_of_birth', 'gender', 'phone_no')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name',
                       'email', 'password1', 'password2',
                       'date_of_birth', 'gender', 'phone_no',)
        }),
    )
    search_fields = ('email', 'first_name', 'last_name', 'phone_no',)
    ordering = ('first_name', 'last_name', 'email', )
    filter_horizontal = ()
    inlines = [
        AddressInLine,
    ]


class AddressManager(admin.ModelAdmin):
    inlines = [
        AddressInLine,
    ]


admin.site.register(Customer, CustomerAdmin)
