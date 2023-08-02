from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterUserSerializer, UserSerializer


class UserList(generics.ListAPIView):
    """
    API view for listing users.
    """

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_queryset(self, *args, **kwargs):
        """
        Get the queryset of users filtered by the current user's username.
        """
        user = self.request.user
        return super().get_queryset().filter(username=user.username, *args, **kwargs)


class UserDetail(generics.RetrieveUpdateAPIView):
    """
    API view for retrieving and updating user details.
    """

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_queryset(self, *args, **kwargs):
        """
        Get the queryset of users filtered by the current user's username.
        """
        user = self.request.user
        return super().get_queryset().filter(username=user.username, *args, **kwargs)


class LoginView(TokenObtainPairView):
    """
    API view for user login using JWT authentication.
    """

    serializer_class = TokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    API view for user registration.
    """

    serializer_class = RegisterUserSerializer
    permission_classes = [permissions.AllowAny]
