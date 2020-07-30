# Generated by Django 3.0.7 on 2020-07-30 16:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('paradise', '0027_winner_date_added'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='howitworks',
            options={'ordering': ['-date_created']},
        ),
        migrations.AlterModelOptions(
            name='howtoplay',
            options={'ordering': ['-date_created']},
        ),
        migrations.AddField(
            model_name='howitworks',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='howtoplay',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
