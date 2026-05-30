from django.urls import path

from .views import (
    emission_list,
    approve_emission,
)

urlpatterns = [

    path(
        "",
        emission_list,
    ),

    path(
        "<int:pk>/",
        approve_emission,
    ),
]