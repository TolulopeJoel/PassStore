from django.urls import path
from rest_framework.routers import DefaultRouter

from .import views


urlpatterns = [
    path('same-password/', views.SameCredentials.as_view(), name='same_password'),
]

router = DefaultRouter()

router.register('websites', views.WebsiteViewset, basename='websites')
router.register('credentials', views.CredentialViewset, basename='credentials')

urlpatterns += router.urls
