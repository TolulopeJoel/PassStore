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
        url = request.data.get('url')
        
        # Check if website with given url already exists
        website = self.get_queryset().filter(url=url).first()
        if website:
            return Response(WebsiteSerializer(website).data, status=status.HTTP_200_OK)

        return super().create(request, *args, **kwargs)

    def get_queryset(self, *args, **kwargs):
        """
        Return websites only if they have credentials.
        And delete websites without credentials.
        """
        queryset = super().get_queryset()
        websites_with_credentials = queryset.filter(credentials__isnull=False).values_list('id', flat=True)

        # Delete websites without credentials
        queryset.exclude(id__in=websites_with_credentials).delete()

        return queryset.filter(id__in=websites_with_credentials)


class CredentialViewset(UserQuerySetMixin, viewsets.ModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        website_id = request.data.get('website_id')
        password = request.data.get('password')

        try:
            website = Website.objects.get(id=website_id)
        except Website.DoesNotExist:
            return Response({'detail': 'Website does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(website=website, user=user, password=encrypt_password(password))
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_update(self, serializer):
        password = serializer.validated_data.get('password')
        return serializer.save(password=encrypt_password(password))


class SameCredentials(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        site_credentials = Credential.objects.filter(user=user)

        # dictionary to group site credentials by password
        password_details = {}
        for credentials in site_credentials:
            password = credentials.decrypt_password()
            website = {
                'username': credentials.username,
                'url': credentials.website.url,
            }
            if password not in password_details:
                password_details[password] = {
                    'id': len(password_details),
                    'password': password,
                    'websites': [website],
                }
            else:
                password_details[password]['websites'].append(website)

        # Filter passwords that are used with multiple websites
        same_password = [
            credentials for credentials in password_details.values()
            if len(credentials['websites']) > 1
        ]

        return Response(same_password, status=status.HTTP_200_OK)

