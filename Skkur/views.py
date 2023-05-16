from django.views.generic import ListView, TemplateView

from Menu.models import Menu


class MenuList(ListView):
    template_name = "index.html"
    model = Menu

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context["menu_list"] = Menu.objects.filter(mode = "2",status = "true")
        return context

class Cart(TemplateView):
     template_name = 'cart.html'

class OrderComplete(TemplateView):
     template_name = 'order_complete.html'

class Complete(TemplateView):
     template_name = 'complete.html'
