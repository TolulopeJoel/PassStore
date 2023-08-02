import base64
from django.conf import settings
from cryptography.fernet import Fernet


def encrypt_password(password):
    """
    Encrypt the given password using Fernet encryption.

    Args:
        password (str): The password to be encrypted.

    Returns:
        str: The encrypted password as a URL-safe base64 encoded string, or None if encryption fails.
    """
    try:
        password = str(password)
        cipher = Fernet(settings.ENCRYPTION_KEY)
        encrypted_password = cipher.encrypt(password.encode('ascii'))
        encrypted_password = base64.urlsafe_b64encode(
            encrypted_password).decode('ascii')

        return encrypted_password
    except:
        return None


def decrypt_password(password):
    """
    Decrypt the given password using Fernet decryption.

    Args:
        password (str): The encrypted password to be decrypted.

    Returns:
        str: The decrypted password as a string, or None if decryption fails.
    """
    try:
        password = base64.urlsafe_b64decode(password)
        cipher = Fernet(settings.ENCRYPTION_KEY)
        decoded_password = cipher.decrypt(password).decode('ascii')

        return decoded_password
    except:
        return None
