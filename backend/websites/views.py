from rest_framework import viewsets

from .models import Website
from .serailizers import WebsiteSerializer


class WebsiteViewset(viewsets.ModelViewSet):
    queryset = Website.objects.all()
    serializer_class = WebsiteSerializer
    
    # def get_queryset(self):
    #     queryset = Website.objects.filter(user=self.request.user)
    #     return queryset
