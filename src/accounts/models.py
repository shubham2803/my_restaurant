from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser
)


# Create your models here.


class CustomerManager(BaseUserManager):
    def create_user(self, email, date_of_birth=None, gender=None, phone_no=None, password=None, first_name=None, last_name=None):
        """
        creates and saves customer with given First name, Last Name, Email, Date of Birth,
        Gender, Phone Number and returns the customer object

        :param first_name:
        :param last_name:
        :param email:
        :param date_of_birth:
        :param gender:
        :param phone_no:
        :param password:
        :return: customer object

        """
        # if not first_name:
        #     raise ValueError("First Name is required.")
        #
        if not email:
            raise ValueError("Email is required.")
        #
        # if not date_of_birth:
        #     raise ValueError("Date of birth is required.")
        #
        # if not gender:
        #     raise ValueError("Gender is required.")
        #
        # if not phone_no:
        #     raise ValueError("Phone Number is required.")

        customer = self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            date_of_birth=date_of_birth,
            gender=gender,
            phone_no=phone_no,
        )

        customer.set_password(password)
        customer.save(using=self._db)
        return customer

    def create_superuser(self, email, password=None):
        """
        creates superuser/admin with given email and password
        :param email:
        :param password:
        :return: admin object
        """

        admin = self.create_user(
            email,
            password=password,
        )

        admin.is_admin = True
        admin.save(using=self._db)
        return admin


GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female')
)


class Customer(AbstractBaseUser):
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    email = models.EmailField(verbose_name="Email Address", max_length=255, unique=True)
    phone_no = models.CharField(max_length=10, null=True)
    date_of_birth = models.DateField(null=True)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=5, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    # address = models.OneToOneField('AddressList', null=True, blank=True, on_delete=models.DO_NOTHING)

    objects = CustomerManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_level):
        return True

    @property
    def is_staff(self):
        return self.is_admin

