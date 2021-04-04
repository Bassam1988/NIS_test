from django.urls import path, include
from rest_framework import routers

from . import views

router_sub_category = routers.DefaultRouter()
router_sub_category.register(r'sub_category', views.SubCategoryViewSet, 'shop')

router_main_category = routers.DefaultRouter()
router_main_category.register(r'main_category', views.MainCategoryViewSet, 'shop')

router_address= routers.DefaultRouter()
router_address.register(r'address', views.AddressViewSet, 'shop')

router_product= routers.DefaultRouter()
router_product.register(r'product', views.ProductViewSet, 'shop')

router_show_product= routers.DefaultRouter()
router_show_product.register(r'showProduct', views.ShowProductViewSet, 'shop')

router_query= routers.DefaultRouter()
router_query.register(r'query', views.QueryViewSet, 'shop')

router_notification_cat= routers.DefaultRouter()
router_notification_cat.register(r'notificationCat', views.NotificationCategoryViewSet, 'shop')

router_notification= routers.DefaultRouter()
router_notification.register(r'notification', views.NotificationViewSet, 'shop')

urlpatterns = [
    path('', include(router_sub_category.urls)),
    path('', include(router_main_category.urls)),
    path('', include(router_address.urls)),
    path('', include(router_product.urls)),
    path('', include(router_show_product.urls)),
    path('', include(router_query.urls)),
    path('', include(router_notification_cat.urls)),
    path('', include(router_notification.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
