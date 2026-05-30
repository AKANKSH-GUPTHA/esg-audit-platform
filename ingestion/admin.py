from django.contrib import admin
from .models import IngestionBatch, RawRecord


@admin.register(IngestionBatch)
class IngestionBatchAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "tenant",
        "source_type",
        "status",
        "total_records",
        "failed_records",
        "uploaded_at",
    )

    list_filter = (
        "source_type",
        "status",
    )

    search_fields = (
        "tenant__name",
        "original_file_name",
    )
    
@admin.register(RawRecord)
class RawRecordAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "batch",
        "source_row_number",
        "parsing_status",
        "created_at",
    )

    list_filter = (
        "parsing_status",
    )

    search_fields = (
        "batch__tenant__name",
    )    

