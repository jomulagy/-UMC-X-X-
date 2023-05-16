from django.urls import path
from . import views

app_name = "order"

urlpatterns = [
    path('search/',views.OrderSearch.as_view(),name = "search"),
    path("state/update/",views.OrderStateUpdate.as_view(),name = "state_update"),
    path("create/",views.OrderCreate,name = "create"),
]
