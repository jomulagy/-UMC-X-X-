from django.db import models

class Mode(models.Model):
    name = models.CharField(max_length = 100)

# Create your models here.
class Menu(models.Model):
    STATUS_CHOICES = (
        ('y', '주문가능'),
        ('n', '품절'),
    )
    mode = models.ManyToManyField(Mode)
    name = models.CharField(max_length = 100)
    image = models.ImageField(null = True, upload_to = "menu")
    price = models.IntegerField()
    status = models.CharField(max_length = 100, choices = STATUS_CHOICES)


