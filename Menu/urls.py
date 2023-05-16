from django.urls import path
from . import views

app_name = "menu"

urlpatterns = [

    path("state/update/",views.OrderStateUpdate,name = "state_update"),

]
