from django.urls import path
from . import views

app_name = "manager"

urlpatterns = [
    path('', views.OrderList.as_view(), name ="admin"),
    path('menu/', views.MenuState.as_view(), name ="menu"),

]
