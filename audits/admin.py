from django.contrib import admin
from .models import AuditEvent


@admin.register(AuditEvent)
class AuditEventAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "emission_record",
        "action",
        "performed_by",
        "created_at",
    )

    list_filter = (
        "action",
    )

    search_fields = (
        "emission_record__activity_type",
    )