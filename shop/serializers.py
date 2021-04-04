from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Profile
from accounts.serializers import UserSerializer, UserListField

from .models import *


class MainCategoryListField(serializers.RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "name": value.name}


class SubCategoryListField(serializers.RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "name": value.name}


class SubCategorySerializer(serializers.ModelSerializer):
    m_category = MainCategoryListField(read_only=True, many=False)

    class Meta:
        model = SubCategory
        fields = ('id', 'name', 'm_category')


class MainCategorySerializer(serializers.ModelSerializer):
    #products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    s_cat = SubCategoryListField(read_only=True, many=True)

    class Meta:
        model = MainCategory
        fields = ('id', 'name', 's_cat')


class AddressSerializer(serializers.ModelSerializer):
    #products = ProductSerializer(many=True, read_only=True)
    #products = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), many=True)
    class Meta:
        model = Address
        fields = ('id', 'country', 'state', 'city', 'region',
                  'Address', 'google_map')


class AddressListField(serializers.RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "country": value.country, "state": value.state, "city": value.city, "region": value.region, "Address": value.Address, "google_map": value.google_map}


class FeedbackListField(serializers.RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "description": value.description, "rating": value.rating, "created_at": value.created_at, "customer": value.customer.first_name + value.customer.last_name}


class ProductImagesListField(serializers.RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "img": value.img}


class FeedbackSerializer(serializers.ModelSerializer):
    #customer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=False)
    # UserListField(read_only=True, many=False)
    customer = UserSerializer(many=False, read_only=True)
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=False)
    #created_at = serializers.DateField(required=False, read_only=True)

    class Meta:
        model = Feedback
        set_timezone = 'created_at'
        fields = ('id', 'customer', 'product',
                  'description', 'rating', 'created_at')
       # extra_kwargs = {'created_at': {'read-only': True}}
        #read_only_fields = ('created_at', )


class ShowProductSerializer(serializers.ModelSerializer):

    addresses = AddressListField(read_only=True, many=True)
    #feedbacks = FeedbackListField(read_only=True, many=True)
    feedbacks = FeedbackSerializer(many=True, read_only=True)
    images = ProductImagesListField(read_only=True, many=True)
    #addresses = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), many=True)
    #seller_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=False)
    seller = UserListField(read_only=True, many=False)
    #m_category_id = serializers.PrimaryKeyRelatedField(queryset=MainCategory.objects.all(), many=False)
    m_category = MainCategoryListField(read_only=True, many=False)
    #s_categories = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), many=True)
    s_categories = SubCategoryListField(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ('id', 'seller', 'm_category', 'name', 'price', 'old_price', 'viewd_at', 'numberOfViews', 'description', 'img', 'summary',
                  'vedio', 's_categories', 'other_s_category', 'addresses', 'feedbacks', 'images', 'created_at')
        depth = 2

    def create(self, validated_data):

        product = Product.objects.create(validated_data['name'],
                                         validated_data['description'], validated_data['price'])

        product.seller = validated_data['seller']
        product.m_category = validated_data['m_category']
        product.old_price = validated_data['old_price']

        s_categories_data = validated_data.pop('s_categories')
        for s_category_data in s_categories_data:
            new_s_category = SubCategory.objects.get(id=s_category_data)
            product.s_categories.add(new_s_category)
        product.save()


class ProductSerializer(serializers.ModelSerializer):
    #addresses = serializers.PrimaryKeyRelatedField(source='addresses.id', queryset=Address.objects.all(), many=True)
    #addresses = AddressSerializer(many=True,read_only=True)
    #seller = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=False)
    #m_category = serializers.PrimaryKeyRelatedField( queryset=MainCategory.objects.all(), many=False)
    #s_categories = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), many=True)
    #s_categories = SubCategorySerializer(many=True )
    class Meta:
        model = Product
        fields = ('seller', 'm_category', 'name', 'price', 'description', 'old_price', 'summary',
                  'img', 'vedio', 's_categories', 'other_s_category', 'addresses', 'viewd_at')

    def create(self, validated_data):

        #seller_id = validated_data['seller'].id
        user = self.context.get('seller_data')
        product = Product.objects.create(seller=user)
        #product = Product.objects.create(**validated_data)

       # product.seller = validated_data['seller']
        product.m_category = validated_data['m_category']
        product.old_price = validated_data['old_price']
        # product.s_categories.set(validated_data.pop('s_categories'))
        s_categories_data = validated_data.pop('s_categories')
        for s_category_data in s_categories_data:
            new_s_category = SubCategory.objects.get(id=s_category_data.id)
            product.s_categories.add(new_s_category)
        addresses_data = validated_data.pop('addresses')
        for address_data in addresses_data:
            new_address = Address.objects.get(id=address_data.id)
            product.addresses.add(new_address)
        product.save()

        return product


class QuerySerializer(serializers.HyperlinkedModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=False)

    class Meta:
        model = Query
        fields = ('id', 'customer', 'description', 'done')


class QueryListField(serializers.RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "description": value.description}


class ProductImagesSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=False)

    class Meta:
        model = Feedback
        fields = ('id', 'product', 'img')


class NotificationCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NotificationCategory
        fields = ('id', 'name',)


class NotificationCategoryListField(serializers.RelatedField):

    def to_representation(self, value):
        return {"id": value.id, "name": value.name}


class NotificationSerializer(serializers.HyperlinkedModelSerializer):
    user = UserListField(read_only=True, many=False)
    #note_category = NotificationCategoryListField(read_only=True, many=False)
    note_category = serializers.PrimaryKeyRelatedField(
        queryset=NotificationCategory.objects.all(), many=False)
    showedByUsers = UserListField(read_only=True, many=True)

    class Meta:
        model = Notification
        fields = ('id', 'note_category', 'description', 'done',
                  'description', 'user', 'showedByUsers')
