import base64
from django.conf import settings
from cryptography .fernet import Fernet


def encrypt_password(password):
    try:
        password = str(password)
        cipher = Fernet(settings.ENCRYPTION_KEY)
        encrypt_password = cipher.encrypt(password.encode('ascii'))
        encrypt_password = base64.urlsafe_b64encode(encrypt_password).decode('ascii')

        return encrypt_password
    except:
        return None


def decrypt_password(password):
    try:
        password = base64.urlsafe_b64decode(password)
        cipher = Fernet(settings.ENCRYPTION_KEY)
        decode_password = cipher.decrypt(password).decode('ascii')

        return decode_password
    except:
        return None
