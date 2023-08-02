from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class UserListViewTest(APITestCase):
    """
    Test case for the user list view.
    Tests if the view returns the correct data and response status when listing users.
    """

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123'
        )
        self.url = reverse('profile-list')
        self.client.force_authenticate(user=self.user)

    def test_user_list_view(self):
        """
        Test the user list view.
        Verifies that the view returns the expected data and HTTP status code (200 OK).
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)


class UserDetailViewTest(APITestCase):
    """
    Test case for the user detail view.
    Tests if the view returns the correct data and response status when retrieving a user's details.
    """

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123'
        )
        self.url = reverse('profile-detail', args=[self.user.id])
        self.client.force_authenticate(user=self.user)

    def test_user_detail_view(self):
        """
        Test the user detail view.
        Verifies that the view returns the expected data and HTTP status code (200 OK).
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['username'],
            self.user.username
        )


class LoginViewTest(APITestCase):
    """
    Test case for the login view.
    Tests if the view returns the correct access and refresh tokens when a user logs in with valid credentials.
    """

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123'
        )
        self.url = reverse('login')

    def test_login_view(self):
        """
        Test the login view.
        Verifies that the view returns the expected access and refresh tokens with a successful login (HTTP status code 200 OK).
        """
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)


class RegisterViewTest(APITestCase):
    """
    Test case for the register view.

    Tests if the view creates a new user correctly when valid data is provided.
    """

    def setUp(self):
        self.url = reverse('register')

    def test_register_view(self):
        """
        Test the register view.
        Verifies that the view creates a new user and returns HTTP status code 201 CREATED.
        """
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'password': 'newpass123',
            'password2': 'newpass123'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_user_model().objects.count(), 1)
        self.assertEqual(get_user_model().objects.first().username, 'newuser')


class AuthenticationTest(APITestCase):
    """
    Test case for user authentication.
    Tests the authentication process by obtaining access and refresh tokens and accessing a protected view with the access token.
    """

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123'
        )

    def test_authentication(self):
        """
        Test user authentication.
        Verifies that the access token is obtained successfully and allows access to a protected view (HTTP status code 200 OK).
        """
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

        access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        user_url = reverse('profile-detail', args=[self.user.id])
        response = self.client.get(user_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)
