from django.urls import path
from . import views

app_name = "menu"

urlpatterns = [

    path("state/update/",views.OrderStateUpdate.as_view(),name = "state_update"),

]
