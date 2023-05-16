from django.shortcuts import render
from django.views.generic import View

from django.http import JsonResponse
import json

from .models import Menu

class OrderStateUpdate(View):
    def post(self, request):
        data = json.loads(request.body)
        order = Menu.objects.get(id = data["id"])
        print(order.status)
        if order.status == "true":
            order.status = "false"
            order.save()
        else:
            print(1)
            order.status = "true"
            order.save()


        return JsonResponse({'success': True})
