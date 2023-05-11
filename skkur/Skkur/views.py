from django.shortcuts import render
from django.views.generic import ListView

from Menu.models import Menu
class MenuList(ListView):
    template_name = "order_complete.html"
    model = Menu
