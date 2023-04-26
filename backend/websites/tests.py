from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .encryption import decrypt_password, encrypt_password
from .models import Credential, Website


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


class CredentialTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.website = Website.objects.create(
            user=self.user,
            url='https://www.example.com'
        )
        self.credential = Credential.objects.create(
            user=self.user,
            website=self.website,
            username='testuser',
            password='testpassword'
        )

    def test_credential_decrypt_password(self):
        """
        Test that the decrypt_password method on the Credential model correctly decrypts the password.
        """
        encrypted_password = encrypt_password(self.credential.password)
        decrypted_password = decrypt_password(encrypted_password)
        self.assertEqual(decrypted_password, 'testpassword')

    def test_create_credential(self):
        """
        Test that a new credential can be created using the Credential viewset.
        """
        self.client.force_authenticate(user=self.user)
        url = reverse('credentials-list')
        data = {
            'website_id': self.website.id,
            'username': 'newuser',
            'password': 'newpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'newuser')
        self.assertEqual((response.data['password_']), ('newpassword'))

    def test_update_credential(self):
        """
        Test that a credential can be updated using the Credential viewset.
        """
        self.client.force_authenticate(user=self.user)
        url = reverse('credentials-detail', args=[self.credential.id])
        data = {
            'password': 'newpassword'
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['password_'], ('newpassword'))
