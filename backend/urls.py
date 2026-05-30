from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/tenants/", include("tenants.urls")),

    path("api/emissions/", include("emissions.urls")),

    path("api/analytics/", include("analytics_app.urls")),

    path("api/ingestion/", include("ingestion.urls")),

    path("api/audits/", include("audits.urls")),
]