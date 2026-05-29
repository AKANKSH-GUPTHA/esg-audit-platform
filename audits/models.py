from django.db import models
from django.contrib.auth.models import User
from emissions.models import EmissionRecord


class AuditEvent(models.Model):

    ACTION_CHOICES = [
        ("approved", "Approved"),
        ("rejected", "Rejected"),
        ("edited", "Edited"),
        ("locked", "Locked"),
    ]

    emission_record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE,
        related_name="audit_events"
    )

    action = models.CharField(
        max_length=50,
        choices=ACTION_CHOICES
    )

    performed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    previous_value = models.JSONField(
        blank=True,
        null=True
    )

    new_value = models.JSONField(
        blank=True,
        null=True
    )

    comment = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} - Record {self.emission_record.id}"