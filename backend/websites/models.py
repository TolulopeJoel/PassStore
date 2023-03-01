from django.db import models
from django.contrib.auth import get_user_model


class Website(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='websites')
    url = models.URLField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('-updated_at',)
        unique_together = 'user', 'url'
    
    def __str__(self):
        return self.url


class Credential(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='credentials') 
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='credentials')
    username = models.CharField(max_length=50, blank=True)
    password = models.CharField(max_length=50)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('-updated_at',)
        unique_together = 'website', 'username', 'password'
    
    def __str__(self):
        return self.username