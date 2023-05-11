from django.db import models

# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = (
        ('day', '낮'),
        ('night', '밤'),
    )
    menu_and_quantity = models.CharField(max_length = 100)
    table_num = models.IntegerField()
    total_price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add = True)
    status = models.CharField(max_length = 100, choices = STATUS_CHOICES)


