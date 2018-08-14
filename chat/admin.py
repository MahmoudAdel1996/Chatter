from django.contrib import admin
from .models import User, Message, Chatroom
# Register your models here.

admin.site.register(Message)
admin.site.register(Chatroom)
