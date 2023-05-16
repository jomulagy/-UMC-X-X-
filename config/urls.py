from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('',include("Skkur.urls")),
    path('order/',include("Order.urls")),
    path('admin/',include("Manager.urls")),
    path('menu/',include("Menu.urls")),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
