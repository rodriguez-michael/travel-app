from rest_framework import serializers
from .models import FavoriteList
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer


# ----- User -----

class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'username']


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        print('payload', payload)
        token = jwt_encode_handler(payload)
        print('token', token)
        return token

    def create(self, validated_data):
        print('validatd data', validated_data)
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'email', 'first_name', 'last_name')
        
        
# ----- Favorite List -----


class FavoriteListSerializer(ModelSerializer):
    id = serializers.ReadOnlyField()
    created_at = serializers.ReadOnlyField()
    #registered_user = UserSerializer(source='user', many=False, read_only=True)

    class Meta:
        model = FavoriteList
        fields = ['id', 'origin', 'destination', 'departure_date', 'return_date', 'oneway', 'created_at', 'user', 'price']