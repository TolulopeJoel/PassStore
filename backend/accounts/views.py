from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterUserSerializer, UserSerializer


class UserList(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        return super().get_queryset().filter(username=user.username, *args, **kwargs)


class UserDetail(generics.RetrieveUpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        return super().get_queryset().filter(username=user.username, *args, **kwargs)


class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = [permissions.AllowAny]
