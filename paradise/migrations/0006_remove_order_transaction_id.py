# Generated by Django 3.0.7 on 2020-07-03 09:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('paradise', '0005_coupon'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='transaction_id',
        ),
    ]