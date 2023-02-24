from rest_framework import serializers

from .models import Website, Credential


class WebsiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Website
        fields = ('id', 'user', 'url', 'updated_at')


class CredentialSerializer(serializers.ModelSerializer):

    class Meta:
        model = Credential
        fields = (
            'id',
            'user',
            'website',
            'username',
            'password',
            'updated_at',
        )
