from rest_framework import viewsets, permissions

from .serializers import *

from django.shortcuts import render

from rest_framework import viewsets

from .serializers import *

from .models import *

from rest_framework.response import Response

from rest_framework import generics


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
    #permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all().order_by('id')

    def post(self, request, *args, **kwargs):

        # data['seller_data']=self.request.user
        kwargs["seller_data"]=self.request.user
        serializer = self.get_serializer(data=request.data)
        #serializer.context['seller'] = self.request.user
        serializer.is_valid(raise_exception=True)

        product = serializer.save()
        return Response({
            "product": ShowProductSerializer(product, context=self.get_serializer_context()).data
        })

    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)    

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'seller_data': self.request.user
        }


class ShowProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

    serializer_class = ShowProductSerializer

    def get_queryset(self):
        return Product.objects.all()

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class QueryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = QuerySerializer

    def get_queryset(self):
        return self.request.user.myQueries.all()

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


class FeedbackViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FeedbackSerializer

    def get_queryset(self):
        return self.request.user.feedbacks.all().order_by('created_at')

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


class NotificationCategoryViewSet(viewsets.ModelViewSet):
    queryset = NotificationCategory.objects.all().order_by('id')
    serializer_class = NotificationCategorySerializer


class NotificationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return self.request.user.myNotifications.all()

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
