from rest_framework import generics

from .models import Tenant
from .serializers import TenantSerializer


class TenantListAPIView(generics.ListAPIView):

    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer