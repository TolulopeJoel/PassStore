from django.contrib.auth import get_user_model
from rest_framework import serializers

from websites.models import Credential


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user details with the count of saved passwords.
    """
    saved_passwords = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'saved_passwords',
            'date_joined',
        ]

    def get_saved_passwords(self, obj):
        """
        Get the count of saved passwords associated with the user.
        """
        request = self.context.get('request')
        user = request.user
        site_credentials = Credential.objects.filter(user=user)
        return len(site_credentials)


class UserPublicSerializer(serializers.Serializer):
    """
    Serializer for publicly accessible user data.
    """
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True, max_length=225)
    email = serializers.EmailField(read_only=True)


class RegisterUserSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration (create user) with password validation.
    """
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'username',
            'password',
            'password2'
        ]

    def create(self, validated_data):
        """
        Create a new user using the validated data.
        """
        validated_data.pop('password2')
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def validate(self, attrs):
        """
        Validate the password and password2 fields to ensure they match.
        """
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError('Passwords must match')
        return attrs
