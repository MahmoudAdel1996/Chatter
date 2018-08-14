from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Chatroom(models.Model):
    botname = models.CharField(max_length=50)
    def __str__(self):
        return self.botname


class Message(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    chatroom_id = models.ForeignKey(Chatroom, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.message
