from django.shortcuts import render
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt

from django.http import JsonResponse
import json

from .models import Menu

def MenuStateUpdate(request):
        if request.method == "POST":
            data = json.loads(request.body)
            order = Menu.objects.get(id = data["id"])
            print(order.status)
            if order.status == "true":
                order.status = "false"
                order.save()
            else:
                order.status = "true"
                order.save()


            return JsonResponse({'success': True})
