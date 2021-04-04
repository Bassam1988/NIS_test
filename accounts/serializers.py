
from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate

from .models import *

# User Serializer
class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('bio', 'location', 'birth_date', 'img')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'groups', 'profile')


class UserListField(serializers.RelatedField):
    def to_representation(self, value):
        return {"username": value.username, "email": value.email, "first_name": value.first_name, "last_name": value.last_name}

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',
                  'first_name', 'last_name', 'groups','profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'], validated_data['password'])

        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']

        groups_data = validated_data.pop('groups')
        for group_data in groups_data:
            new_group = Group.objects.get(name=group_data)
            user.groups.add(new_group)
        user.save()
        Profile.objects.create(user=user, **profile_data)

        return user



# Login Seriliazer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
