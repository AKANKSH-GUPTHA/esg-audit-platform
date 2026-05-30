from rest_framework import generics
from .models import AuditEvent
from .serializers import AuditEventSerializer

class AuditEventListView(generics.ListAPIView):
    queryset = AuditEvent.objects.all()
    serializer_class = AuditEventSerializer