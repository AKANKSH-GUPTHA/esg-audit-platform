from django.urls import path

from .views import (
    emission_list,
    approve_emission,
)

urlpatterns = [

    path(
        "",
        emission_list,
        name="emission-list"
    ),

    path(
        "<int:pk>/approve/",
        approve_emission,
        name="approve-emission"
    ),
]