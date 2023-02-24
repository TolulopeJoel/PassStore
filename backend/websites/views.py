from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Credential, Website
from .serailizers import CredentialSerializer, WebsiteSerializer


class WebsiteViewset(viewsets.ModelViewSet):
    queryset = Website.objects.all()
    serializer_class = WebsiteSerializer
    
    # def get_queryset(self):
    #     queryset = Website.objects.filter(user=self.request.user)
    #     return queryset


class CredentialViewset(viewsets.ModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer
    
    def post(self, request, *args, **kwargs):
        website_id = request.data.get('website_id')
        try:
            website = Website.objects.get(id=website_id)
        except Website.DoesNotExist:
            return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

        username = request.data.get('username')
        password = request.data.get('password')
        credential = Credential(
            user=request.user,
            website=website,
            username=username,
            password=password
        )
        credential.save()

        return Response(CredentialSerializer(credential).data, status=status.HTTP_201_CREATED)