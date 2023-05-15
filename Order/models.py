from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Order(models.Model):
    STATUS_CHOICES = (
        ('checking', 'checking'),
        ('in_progress', 'in_progress'),
        ('done', 'done'),
    )
    table_num = models.IntegerField()
    total_price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add = True)
    status = models.CharField(max_length = 100, choices = STATUS_CHOICES)
    phone_num = PhoneNumberField()

class Ordered_Menu(models.Model):
    menu = models.ForeignKey("Menu.Menu",on_delete = models.CASCADE)
    order = models.ForeignKey(Order,on_delete = models.CASCADE)
    quantity = models.IntegerField()

    def get_menu_name(self):
        print("model : ",self.menu.name)
        return self.menu.name



