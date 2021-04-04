from django.shortcuts import render

from rest_framework import viewsets

from .serializers import *

from .models import *


class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all().order_by('name')
    serializer_class = SubCategorySerializer


class MainCategoryViewSet(viewsets.ModelViewSet):
    queryset = MainCategory.objects.all().order_by('name')
    serializer_class = MainCategorySerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all().order_by('id')
    serializer_class = AddressSerializer 

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ShowProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ShowProductSerializer

class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all().order_by('id')
    serializer_class = QuerySerializer

    
class NotificationCategoryViewSet(viewsets.ModelViewSet):
    queryset = NotificationCategory.objects.all().order_by('id')
    serializer_class = NotificationCategorySerializer

    
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().order_by('id')
    serializer_class = NotificationSerializer