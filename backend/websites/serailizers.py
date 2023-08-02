from rest_framework import serializers

from accounts.serializers import UserPublicSerializer

from .models import Website, Credential


class WebsitePublicSerializer(serializers.Serializer):
    """
    Serializer for publicly accessible website data.
    """
    id = serializers.IntegerField(read_only=True)
    url = serializers.URLField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)


class CredentialPublicSerializer(serializers.Serializer):
    """
    Serializer for publicly accessible credential data.
    """
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(read_only=True, source='decrypt_password')
    updated_at = serializers.DateTimeField(read_only=True)


class WebsiteSerializer(serializers.ModelSerializer):
    """
    Serializer for Website model data.
    """
    user = UserPublicSerializer(read_only=True)
    credentials = CredentialPublicSerializer(many=True, read_only=True)

    class Meta:
        model = Website
        fields = [
            'id',
            'user',
            'url',
            'credentials',
            'updated_at',
        ]


class CredentialSerializer(serializers.ModelSerializer):
    """
    Serializer for Credential model data.
    """
    user = UserPublicSerializer(read_only=True)
    website = WebsitePublicSerializer(read_only=True)
    password = serializers.CharField(write_only=True)
    password_ = serializers.CharField(
        read_only=True, source='decrypt_password')

    class Meta:
        model = Credential
        fields = [
            'id',
            'user',
            'website',
            'username',
            'password',
            'password_',
            'updated_at',
        ]
