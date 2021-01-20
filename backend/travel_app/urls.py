from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    current_user, 
    UserList,
    FavoriteListAPIView,
    )

router = DefaultRouter()
router.register(r'list', FavoriteListAPIView, basename='list')

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
]

urlpatterns += router.urls