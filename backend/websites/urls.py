from django.urls import path
from rest_framework.routers import DefaultRouter

from .import views


urlpatterns = [
    path('same-password/', views.SameCredentials.as_view(), name='same-credentials'),
]

router = DefaultRouter()

router.register('websites', views.WebsiteViewset, basename='website')
router.register('credentials', views.CredentialViewset, basename='credential')

urlpatterns += router.urls
