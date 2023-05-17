from django.shortcuts import render
from django.views.generic import View, ListView
from .utils import Orders_to_Json
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Order, Ordered_Menu
from Menu.models import Menu


def OrderStateUpdate(request):
        if request.method == "POST":
            data = json.loads(request.body)
            order = Order.objects.get(id = data["id"])
            order.status = data["state"]
            order.save()

            return JsonResponse({'success': True})


class OrderSearch(ListView):
    template_name = "order/search.html"
    model = Order

    def get_context_data(self, **kwargs):
        context = {}
        queryset = self.get_queryset()
        context["data"] = Orders_to_Json(queryset)

        return context

    def get(self, request, *args, **kwargs):
        if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
            data = self.get_context_data()
            return JsonResponse(data)
        else:
            return super().get(request, *args, **kwargs)



def OrderCreate(request):
    if request.method == "POST":
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

