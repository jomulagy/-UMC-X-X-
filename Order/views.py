from django.shortcuts import render
from django.views.generic import View, ListView
from .utils import Orders_to_Json
import json
from django.http import JsonResponse

from .models import Order, Ordered_Menu
from Menu.models import Menu
class OrderList(ListView):
    template_name = "admin/admin.html"
    model = Order

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        queryset = self.get_queryset()
        context["queryset_json"] = Orders_to_Json(queryset)

        return context

class OrderStateUpdate(View):
    def post(self, request):
        data = json.loads(request.body)
        order = Order.objects.get(id = data["id"])
        order.status = "done"
        order.save()

        return JsonResponse({'success': True})

class OrderSearch(ListView):
    template_name = "order/search.html"
    model = Order

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        queryset = self.get_queryset()
        context["data"] = Orders_to_Json(queryset)

        return context

class OrderCreate(View):
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        menues = json.loads(data[0]["menus"])
        print(menues)
        total_price = 0
        order = Order()
        order.table_num = data[0]["table_num"]
        order.total_price = 0

        order.status = "checking"
        order.phone_num = data[0]["phone_num"]
        order.save()
        for menu in menues:
            new = Ordered_Menu()
            new.menu = Menu.objects.get(name = menu["name"])
            print(new.menu)
            new.quantity = menu["amount"]
            new.order = order
            new.save()
            price = Menu.objects.get(name = menu["name"]).price
            total_price += price * int(menu["amount"])

        order.total_price = total_price
        order.save()

        return JsonResponse({'success': True})
