from rest_framework import status, viewsets
from rest_framework.response import Response

from accounts.mixins import UserQuerySetMixin

from .models import Credential, Website
from .serailizers import CredentialSerializer, WebsiteSerializer


class WebsiteViewset(UserQuerySetMixin, viewsets.ModelViewSet):
    queryset = Website.objects.all()
    serializer_class = WebsiteSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CredentialViewset(UserQuerySetMixin, viewsets.ModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer

    def perform_create(self, serializer):
        user = self.request.user
        website_id = self.request.data.get('website_id')

        try:
            website = Website.objects.get(id=website_id)
            return serializer.save(user=user, website=website)
        except:
            return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)
