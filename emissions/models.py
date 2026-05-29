from django.db import models
from tenants.models import Tenant
from ingestion.models import RawRecord


class EmissionRecord(models.Model):

    SCOPE_CHOICES = [
        ("scope_1", "Scope 1"),
        ("scope_2", "Scope 2"),
        ("scope_3", "Scope 3"),
    ]

    STATUS_CHOICES = [
        ("pending_review", "Pending Review"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
        ("locked", "Locked"),
    ]

    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE,
        related_name="emission_records"
    )

    raw_record = models.ForeignKey(
        RawRecord,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="emission_records"
    )

    activity_type = models.CharField(max_length=100)

    scope = models.CharField(
        max_length=50,
        choices=SCOPE_CHOICES
    )

    quantity = models.FloatField()

    unit = models.CharField(max_length=50)

    emission_factor = models.FloatField()

    calculated_emissions = models.FloatField(
        help_text="Metric tons CO2 equivalent"
    )

    anomaly_flag = models.BooleanField(default=False)

    analyst_status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="pending_review"
    )

    source_reference = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.activity_type} - {self.scope}"