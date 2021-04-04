from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django_private_chat import urls as django_private_chat_urls

urlpatterns = [
     path('', include(django_private_chat_urls)),
    path('admin/', admin.site.urls),
    path('shopf/', include("frontend.urls")),
    path('shop/', include("shop.urls")),
    path('account/', include("accounts.urls")),
   
    #url(r'^', include(django_private_chat_urls)),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
