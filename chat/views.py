from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from django.contrib import auth
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import Message, Chatroom
#from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def login_view(request):
    return render(request, 'login.html')


def logout_view(request):
    auth.logout(request)
    return render(request, 'logout.html')


def is_authenticated(user):
    if callable(user.is_authenticated):
        return user.is_authenticated()
    return user.is_authenticated

def chatview(request):
    messages = Message.objects.all()
    rooms = Chatroom.objects.all()
    if not is_authenticated(request.user):
        if request.method == 'POST':
            form = AuthenticationForm(data=request.POST)
            if form.is_valid():
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password')
                user = authenticate(username=username, password=password)
                auth.login(request, user)
                return render(request, 'chat.html', {'messages': messages, 'rooms':rooms})
            else:
                return render(request, 'login.html', {'error' : 'error'})
        else:
            return redirect('login')
    else:
        return render(request, 'chat.html', {'messages': messages, 'rooms': rooms})

def AddMessage(request):
    if request.method == 'POST':
        message = request.POST.get('message', None)
        botname = request.POST.get('botname', None)
        username = request.POST.get('username', None)
        context = {
            'message':message,
            'botname':botname,
            'username':username,
        }
        """ Message.objects.create(
            chatroom_id_id=Chatroom.objects.get(botname=botname).id,
            user_id=request.user,
            message=message,
        ) """
        return JsonResponse(context)
    else:
        msg = serializers.serialize('json', Message.objects.all())
        return HttpResponse(msg)
