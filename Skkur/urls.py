from django.urls import path
from . import views

app_name = "skkur"

urlpatterns = [
    path('', views.MenuList.as_view(), name = "index"),
    path('cart/', views.Cart.as_view(), name = "cart"),
    path('complete/', views.Complete.as_view(), name = "complete"),
    path('order_complete/', views.OrderComplete.as_view(), name = "order_complete")
]
