# Generated by Django 3.1.1 on 2020-12-18 11:09

from django.db import migrations, models
import shop.models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_auto_20201216_0917'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=shop.models.upload_path),
        ),
    ]