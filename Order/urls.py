from django.urls import path
from . import views

app_name = "order"

urlpatterns = [
    path('admin/',views.OrderList.as_view(),name = "admin"),
    path('order/search/',views.OrderSearch.as_view(),name = "search"),
    path("order/state/update/",views.OrderStateUpdate.as_view(),name = "state_update"),
]
