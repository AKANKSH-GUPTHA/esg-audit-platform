from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import csv
import io

from emissions.models import EmissionRecord
from tenants.models import Tenant

from emissions.ai_engine import detect_anomalies


class CSVUploadView(APIView):

    def post(self, request):

        file = request.FILES.get("file")

        if not file:

            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        decoded_file = file.read().decode("utf-8")

        csv_data = csv.DictReader(
            io.StringIO(decoded_file)
        )

        tenant, created = Tenant.objects.get_or_create(
    name="Default ESG Corp",
    defaults={
        "industry": "Manufacturing"
    }
)

        rows = list(csv_data)

        emission_values = []

        for row in rows:

            emission_values.append(
                float(
                    row.get(
                        "calculated_emissions",
                        0
                    )
                )
            )

        anomaly_results = detect_anomalies(
            emission_values
        )

        created_records = []

        for index, row in enumerate(rows):

            is_anomaly = anomaly_results[index]

            emission = EmissionRecord.objects.create(

                tenant=tenant,

                activity_type=row.get(
                    "activity_type"
                ),

                scope=row.get("scope"),

                quantity=float(
                    row.get("quantity", 0)
                ),

                unit=row.get("unit"),

                emission_factor=float(
                    row.get(
                        "emission_factor",
                        0
                    )
                ),

                calculated_emissions=float(
                    row.get(
                        "calculated_emissions",
                        0
                    )
                ),

                analyst_status=(
                    "flagged"
                    if is_anomaly
                    else "approved"
                ),

                anomaly_flag=is_anomaly,

                source_reference="CSV-UPLOAD",
            )

            created_records.append(
                emission.id
            )

        return Response({

            "message":
            "CSV uploaded successfully",

            "records_created":
            len(created_records)

        })