from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import Website

class WebsiteViewsetTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser', email='testuser@example.com', password='testpass'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_website(self):
        """
        Test that a website can be created with valid data.
        """
        url = 'https://example.com'
        data = {'url': url}
        response = self.client.post(reverse('websites-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        website = Website.objects.filter(url=url).first()
        self.assertIsNotNone(website)
        self.assertEqual(website.user, self.user)

    def test_create_duplicate_website(self):
        """
        Test that attempting to create a website with a duplicate URL returns the existing website.
        """
        url = 'https://example.com'
        Website.objects.create(user=self.user, url=url)
        data = {'url': url}
        response = self.client.post(reverse('websites-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], url)

    def test_delete_website_without_credentials(self):
        """
        Test that a website can be deleted when it has no associated credentials.
        """
        website = Website.objects.create(user=self.user, url='https://example.com')
        response = self.client.get(reverse('websites-list'))
        self.assertEqual([], response.data['results'])
        website.credentials.all().delete()
        response = self.client.get(reverse('websites-list'))
        self.assertNotIn(website, response.data)
