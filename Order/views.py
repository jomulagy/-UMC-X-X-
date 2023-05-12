from django.shortcuts import render
from django.views.generic import View, ListView
from .utils import Orders_to_Json
import json
from django.http import JsonResponse

from .models import Order
# Create your views here.
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

class OrderSearch(View):
    def get(self, request, *args, **kwards):
        return render(request, "order_search.html")

    def post(self, request):
        data = json.loads(request.body)
        print(data)
        order = Order.objects.filter(phone_num = data["keyword"])
        data = Orders_to_Json(order)
        print(data)
        return JsonResponse(json.dumps(data, ensure_ascii=False), safe=False)


