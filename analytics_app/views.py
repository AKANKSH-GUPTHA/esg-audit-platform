from rest_framework.response import Response
from rest_framework.views import APIView

from emissions.models import EmissionRecord


class DashboardAnalyticsAPIView(APIView):

    def get(self, request):

        emission_records = EmissionRecord.objects.all()

        total_emissions = sum(
            record.calculated_emissions
            for record in emission_records
        )

        scope_1_total = sum(
            record.calculated_emissions
            for record in emission_records
            if record.scope == "scope_1"
        )

        scope_2_total = sum(
            record.calculated_emissions
            for record in emission_records
            if record.scope == "scope_2"
        )

        scope_3_total = sum(
            record.calculated_emissions
            for record in emission_records
            if record.scope == "scope_3"
        )

        anomaly_count = emission_records.filter(
            anomaly_flag=True
        ).count()

        approved_count = emission_records.filter(
            analyst_status="approved"
        ).count()

        pending_review_count = emission_records.filter(
            analyst_status="pending_review"
        ).count()

        data = {
            "total_emissions": total_emissions,
            "scope_1_total": scope_1_total,
            "scope_2_total": scope_2_total,
            "scope_3_total": scope_3_total,
            "anomaly_count": anomaly_count,
            "approved_count": approved_count,
            "pending_review_count": pending_review_count,
        }

        return Response(data)