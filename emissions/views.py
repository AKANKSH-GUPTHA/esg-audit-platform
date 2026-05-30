from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import EmissionRecord
from .serializers import EmissionRecordSerializer

from audits.models import AuditEvent


@api_view(["GET"])
def emission_list(request):

    emissions = EmissionRecord.objects.all()

    serializer = EmissionRecordSerializer(
        emissions,
        many=True
    )

    return Response(serializer.data)


@api_view(["PATCH"])
def approve_emission(request, pk):

    try:

        emission = EmissionRecord.objects.get(
            id=pk
        )

        emission.analyst_status = "approved"

        emission.save()

        # CREATE AUDIT EVENT
        AuditEvent.objects.create(

            event_type="APPROVED",

            description=f"""
            Emission approved:
            {emission.activity_type}
            """
        )

        serializer = EmissionRecordSerializer(
            emission
        )

        return Response(serializer.data)

    except EmissionRecord.DoesNotExist:

        return Response(
            {"error": "Emission not found"},
            status=status.HTTP_404_NOT_FOUND
        )