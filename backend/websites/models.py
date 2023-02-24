from django.db import models
from django.contrib.auth import get_user_model


class Website(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='websites')
    url = models.URLField()
    
    class Meta:
        unique_together = 'user', 'url'
    
    def __str__(self):
        return self.url