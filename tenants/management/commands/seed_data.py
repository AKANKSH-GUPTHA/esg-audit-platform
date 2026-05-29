from django.core.management.base import BaseCommand
from tenants.models import Tenant


class Command(BaseCommand):

    help = "Seed initial tenant data"

    def handle(self, *args, **kwargs):

        tenants = [
            {
                "name": "Breathe Manufacturing Group",
                "slug": "breathe-manufacturing",
                "industry": "manufacturing",
                "headquarters_country": "Germany",
            },
            {
                "name": "SustainCorp Industries",
                "slug": "sustaincorp-industries",
                "industry": "energy",
                "headquarters_country": "United States",
            },
        ]

        for tenant_data in tenants:
            Tenant.objects.get_or_create(
                slug=tenant_data["slug"],
                defaults=tenant_data
            )

        self.stdout.write(
            self.style.SUCCESS("Tenant seed data created successfully.")
        )