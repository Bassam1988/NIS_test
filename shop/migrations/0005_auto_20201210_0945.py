# Generated by Django 3.1.1 on 2020-12-10 09:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shop', '0004_auto_20201210_0923'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='showedByUsers',
            field=models.ManyToManyField(blank=True, related_name='notifications', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='notification',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='product',
            name='other_s_category',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
