from rest_framework import generics, permissions, viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth import get_user_model
from .serializers import RegisterUserSerializer, UserSerializer


class UserViewset(viewsets.ReadOnlyModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = [permissions.AllowAny]
