from django.db import models


class Tenant(models.Model):
    INDUSTRY_CHOICES = [
        ("manufacturing", "Manufacturing"),
        ("technology", "Technology"),
        ("retail", "Retail"),
        ("energy", "Energy"),
    ]

    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)

    industry = models.CharField(
        max_length=100,
        choices=INDUSTRY_CHOICES
    )

    headquarters_country = models.CharField(max_length=100)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name