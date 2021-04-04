from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Register your models here.


def upload_path_user(instance, filname):
    return '/'.join(['img', str(instance.user.id), filname])

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name = 'profile',primary_key=True)
    bio = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    img=models.ImageField(blank=True, null=True, upload_to=upload_path_user)


#@receiver(post_save, sender=User)
#def create_user_profile(sender, instance, created, **kwargs):
#   if created:
#        Profile.objects.create(user=instance)

#@receiver(post_save, sender=User)
#def save_user_profile(sender, instance, **kwargs):
#    instance.profile.save()