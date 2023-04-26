from rest_framework import generics, status, viewsets
from rest_framework.response import Response

from accounts.mixins import UserQuerySetMixin

from .encryption import encrypt_password
from .models import Credential, Website
from .serailizers import CredentialSerializer, WebsiteSerializer


class WebsiteViewset(UserQuerySetMixin, viewsets.ModelViewSet):
    queryset = Website.objects.all()
    serializer_class = WebsiteSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            website = super().get_queryset().get(url=request.data.get('url')) 
            return Response(WebsiteSerializer(website).data, status=status.HTTP_200_OK)
        except Website.DoesNotExist:
            return super().create(request, *args, **kwargs)

    def get_queryset(self, *args, **kwargs):
        """
        Return websites only if website has credentials.
        And delete websites without credentials.
        """
        queryset = super().get_queryset()
        websites_with_credentials = []

        for website in queryset:
            website_credentials = website.credentials.all()
            if website_credentials.count() > 0:
                websites_with_credentials.append(website.id)
            else:
                Website.objects.get(id=website.id).delete()

        return super().get_queryset().filter(id__in=websites_with_credentials)


class CredentialViewset(UserQuerySetMixin, viewsets.ModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer

    def perform_create(self, serializer):
        user = self.request.user
        website_id = self.request.data.get('website_id')
        password = serializer.validated_data.get('password')

        try:
            website = Website.objects.get(id=website_id)
        except:
            return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)
        return serializer.save(user=user, website=website, password=encrypt_password(password))

    def perform_update(self, serializer):
        password = serializer.validated_data.get('password')
        return serializer.save(password=encrypt_password(password))


class SameCredentials(generics.ListAPIView):

    def get(self, request, *args, **kwargs):
        user = request.user
        site_credentials = Credential.objects.filter(user=user)

        # Create a dictionary to group site credentials by password
        password_details = {}
        for credentials in site_credentials:
            password = credentials.decrypt_password()
            website = {
                'username': credentials.username,
                'url': credentials.website.url,
            }
            if password in password_details:
                password_details[password]['websites'].append(website)
            else:
                password_details[password] = {
                    'password': password,
                    'websites': [website],
                }

        # Create a list of password that's used with multiple websites
        same_password = [credentials for password, credentials in password_details.items(
        ) if len(credentials['websites']) > 1]

        return Response(same_password, status=status.HTTP_200_OK)
