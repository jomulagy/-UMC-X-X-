from django.urls import path
from . import views

urlpatterns = [
    path('admin/',views.OrderList.as_view(),name = "admin"),
    path("order/state/update/",views.OrderStateUpdate.as_view(),name = "order_state_update"),
]
