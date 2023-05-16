from django.shortcuts import render
from Order.utils import Orders_to_Json
from django.views.generic import View, ListView

from Order.models import Order
from Menu.models import Menu

from .utils import Menues_to_Json

class OrderList(ListView):
    template_name = "admin/admin.html"
    model = Order

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        queryset = self.get_queryset()
        context["queryset_json"] = Orders_to_Json(queryset)

        return context

class MenuState(ListView):
    template_name = "admin/menu.html"
    model = Menu

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        queryset = self.get_queryset().filter(mode = "2")
        context["menu_list"] = Menues_to_Json(queryset)

        return context
