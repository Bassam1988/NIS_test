from django.urls import path, include
from rest_framework import routers


from . import api

router_sub_category = routers.DefaultRouter()
router_sub_category.register(r'sub_category', api.SubCategoryViewSet, 'shop')

router_main_category = routers.DefaultRouter()
router_main_category.register(r'main_category', api.MainCategoryViewSet, 'shop')

router_address= routers.DefaultRouter()
router_address.register(r'address', api.AddressViewSet, 'shop')

router_product= routers.DefaultRouter()
router_product.register(r'product', api.ProductViewSet, 'shop')

router_show_product= routers.DefaultRouter()
router_show_product.register(r'showProduct', api.ShowProductViewSet, 'shop')

router_query= routers.DefaultRouter()
router_query.register(r'query', api.QueryViewSet, 'shop')

router_feedback= routers.DefaultRouter()
router_feedback.register(r'feedback', api.FeedbackViewSet, 'shop')

router_notification_cat= routers.DefaultRouter()
router_notification_cat.register(r'notificationCat', api.NotificationCategoryViewSet, 'shop')

router_notification= routers.DefaultRouter()
router_notification.register(r'notification', api.NotificationViewSet, 'shop')

urlpatterns = [
    path('', include(router_sub_category.urls)),
    path('', include(router_main_category.urls)),
    path('', include(router_address.urls)),
    path('', include(router_product.urls)),
    path('', include(router_show_product.urls)),
    path('', include(router_query.urls)),
    path('', include(router_notification_cat.urls)),
    path('', include(router_notification.urls)),
    path('', include(router_feedback.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
