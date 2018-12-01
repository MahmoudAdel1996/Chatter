from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login_view, name="login"),
    path('logout', views.logout_view, name="logout"),
    path('AddMessage', views.add_message, name="AddMessage"),
    path('', views.chatview, name="chatview"),
]
