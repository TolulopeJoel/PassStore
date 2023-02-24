from rest_framework.routers import DefaultRouter

from .import views

router = DefaultRouter()

router.register('websites', views.WebsiteViewset, basename='websites')
router.register('credentials', views.CredentialViewset, basename='credentials')

urlpatterns = router.urls
