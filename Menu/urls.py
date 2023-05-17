from django.urls import path
from . import views

app_name = "menu"

urlpatterns = [

    path("state/update/",views.MenuStateUpdate,name = "state_update"),

]
