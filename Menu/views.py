from django.shortcuts import render
from django.views.generic import View

from django.http import JsonResponse
import json

from .models import Menu

class OrderStateUpdate(View):
    def post(self, request):
        data = json.loads(request.body)
        order = Menu.objects.get(id = data["id"])
        if order.status == "true":
            order.status = "false"
        else:
            order.status = "true"
        order.save()

        return JsonResponse({'success': True})
