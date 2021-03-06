# Generated by Django 3.1.7 on 2021-04-02 09:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0027_auto_20210402_0944'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='summary',
            field=models.CharField(default=django.utils.timezone.now, max_length=1500),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='maincategory',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='img/subCategories/2021-04-02 09:54:56.886877'),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to='img/subCategories/2021-04-02 09:54:56.887932'),
        ),
    ]
