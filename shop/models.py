from django.db import models
from datetime import datetime

# Create your models here.
from django.contrib.auth.models import User


# Register your models here.




class MainCategory(models.Model):
    name = models.CharField(max_length=30)
    img= models.ImageField(blank=True, null=True, upload_to='/'.join(['img/subCategories', str(datetime.now())]))

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    m_category = models.ForeignKey(
        MainCategory, on_delete=models.CASCADE, default=1, related_name="s_cat")
    name = models.CharField(max_length=30)
    img= models.ImageField(blank=True, null=True, upload_to='/'.join(['img/subCategories', str(datetime.now())]))

    def __str__(self):
        return self.name

    


class Address(models.Model):
    country = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    region = models.CharField(max_length=30)
    Address = models.CharField(max_length=200)
    google_map = models.CharField(max_length=100)

    

def upload_path(instance, filname):
    return '/'.join(['img', str(instance.created_at), filname])

class Product(models.Model):
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="products")
    m_category = models.ForeignKey(
        MainCategory, on_delete=models.CASCADE, default=1, related_name="products")
    name = models.CharField(max_length=30)
    price = models.FloatField(default=0.00)
    old_price = models.FloatField(default=0.00)
    description = models.CharField(max_length=1500)
    summary = models.CharField(max_length=1500)
    img= models.ImageField(blank=True, null=True, upload_to=upload_path)
    #img = models.CharField(max_length=30, default='./img/avatar.jpg')
    vedio = models.CharField(max_length=30, blank=True)
    s_categories = models.ManyToManyField(
        SubCategory, blank=True, related_name="products" )
    other_s_category = models.CharField(max_length=30, blank=True, null=True)
    addresses = models.ManyToManyField(
        Address, blank=False, related_name="products")
    created_at = models.DateField(default=datetime.now)
    viewd_at = models.DateTimeField(default=datetime.now,editable=True)
    numberOfViews = models.IntegerField(default=0)

    def __str__(self):
        return self.name




class ProductImages(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images")
    img= models.ImageField(blank=True, null=True, upload_to=upload_path)
    created_at = models.DateField(default=datetime.now)

    

class Feedback(models.Model):
    customer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="feedbacks")
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="feedbacks")
    description = models.CharField(max_length=300)
    rating = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description

class Query(models.Model):
    customer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="myQueries")
    description = models.CharField(max_length=100)
    done = models.BooleanField()
    created_at = models.DateField(default=datetime.now)

    def __str__(self):
        return self.description


class NotificationCategory(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Notification(models.Model):
    note_category = models.ForeignKey(
        NotificationCategory, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    done = models.BooleanField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="myNotifications")
    created_at = models.DateField(default=datetime.now)
    showedByUsers = models.ManyToManyField(
        User, blank=True, related_name="notifications")

    def __str__(self):
        return self.description
