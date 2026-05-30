from django.urls import path

from .views import TenantListAPIView


urlpatterns = [
    path("", TenantListAPIView.as_view(), name="tenant-list"),
]