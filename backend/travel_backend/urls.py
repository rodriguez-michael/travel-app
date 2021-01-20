from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('api/', include('travel_app.urls'))
]
