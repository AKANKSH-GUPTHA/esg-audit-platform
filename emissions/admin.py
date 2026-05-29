from django.contrib import admin
from .models import EmissionRecord


@admin.register(EmissionRecord)
class EmissionRecordAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "tenant",
        "activity_type",
        "scope",
        "calculated_emissions",
        "anomaly_flag",
        "analyst_status",
    )

    list_filter = (
        "scope",
        "analyst_status",
        "anomaly_flag",
    )

    search_fields = (
        "activity_type",
        "tenant__name",
    )