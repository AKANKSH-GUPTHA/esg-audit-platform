from django.db import models
from tenants.models import Tenant


class IngestionBatch(models.Model):
    SOURCE_CHOICES = [
        ("sap", "SAP Export"),
        ("utility", "Utility Electricity Data"),
        ("travel", "Corporate Travel Data"),
    ]

    STATUS_CHOICES = [
        ("uploaded", "Uploaded"),
        ("processing", "Processing"),
        ("normalized", "Normalized"),
        ("failed", "Failed"),
        ("review", "Needs Review"),
        ("approved", "Approved"),
        ("locked", "Audit Locked"),
    ]

    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE,
        related_name="batches"
    )

    source_type = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES
    )

    original_file_name = models.CharField(max_length=255)

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="uploaded"
    )

    total_records = models.IntegerField(default=0)
    processed_records = models.IntegerField(default=0)
    failed_records = models.IntegerField(default=0)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tenant.name} - {self.source_type}"


class RawRecord(models.Model):
    RECORD_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("parsed", "Parsed"),
        ("failed", "Failed"),
        ("normalized", "Normalized"),
    ]

    batch = models.ForeignKey(
        IngestionBatch,
        on_delete=models.CASCADE,
        related_name="raw_records"
    )

    raw_payload = models.JSONField()

    source_row_number = models.IntegerField()

    parsing_status = models.CharField(
        max_length=50,
        choices=RECORD_STATUS_CHOICES,
        default="pending"
    )

    error_message = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Batch {self.batch.id} - Row {self.source_row_number}"