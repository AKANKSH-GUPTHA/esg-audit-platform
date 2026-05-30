from django.urls import path

from .views import DashboardAnalyticsAPIView


urlpatterns = [
    path("", DashboardAnalyticsAPIView.as_view(), name="dashboard-analytics"),
]