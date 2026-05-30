from django.core.management.base import BaseCommand

from tenants.models import Tenant
from ingestion.models import IngestionBatch, RawRecord
from emissions.models import EmissionRecord
from audits.models import AuditEvent

from django.contrib.auth.models import User


class Command(BaseCommand):

    help = "Seed ESG demo data"

    def handle(self, *args, **kwargs):

        admin_user, _ = User.objects.get_or_create(
            username="analyst_admin",
            defaults={
                "email": "analyst@esgplatform.com"
            }
        )

        tenant, _ = Tenant.objects.get_or_create(
            slug="breathe-manufacturing",
            defaults={
                "name": "Breathe Manufacturing Group",
                "industry": "manufacturing",
                "headquarters_country": "Germany",
            }
        )

        sap_batch = IngestionBatch.objects.create(
            tenant=tenant,
            source_type="sap",
            original_file_name="sap_fuel_export_q1.csv",
            status="review",
            total_records=3,
            processed_records=3,
            failed_records=1,
        )

        raw_record_1 = RawRecord.objects.create(
            batch=sap_batch,
            source_row_number=1,
            parsing_status="normalized",
            raw_payload={
                "BUDAT": "2026-01-15",
                "MATKL": "Diesel Fuel",
                "MENGE": 12000,
                "MEINS": "L"
            }
        )

        raw_record_2 = RawRecord.objects.create(
            batch=sap_batch,
            source_row_number=2,
            parsing_status="failed",
            error_message="Missing fuel unit",
            raw_payload={
                "BUDAT": "2026-01-17",
                "MATKL": "Natural Gas"
            }
        )

        emission_record = EmissionRecord.objects.create(
            tenant=tenant,
            raw_record=raw_record_1,
            activity_type="Diesel Combustion",
            scope="scope_1",
            quantity=12000,
            unit="liters",
            emission_factor=2.68,
            calculated_emissions=32.16,
            anomaly_flag=True,
            analyst_status="pending_review",
            source_reference="SAP-FUEL-2026-001"
        )

        AuditEvent.objects.create(
            emission_record=emission_record,
            action="edited",
            performed_by=admin_user,
            previous_value={
                "quantity": 10000
            },
            new_value={
                "quantity": 12000
            },
            comment="Corrected quantity after SAP reconciliation"
        )

        self.stdout.write(
            self.style.SUCCESS("ESG demo data seeded successfully.")
        )