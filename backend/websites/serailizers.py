from rest_framework import serializers

from accounts.serializers import UserPublicSerializer

from .models import Website, Credential


class WebsiteSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)

    class Meta:
        model = Website
        fields = ('id', 'user', 'url', 'updated_at')


class WebsitePublicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    url = serializers.URLField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)


class CredentialSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    website = WebsitePublicSerializer(read_only=True)

    class Meta:
        model = Credential
        fields = [
            'id',
            'user',
            'website',
            'username',
            'password',
            'updated_at',
        ]
