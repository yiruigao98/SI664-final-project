from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import User
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

class Ad(models.Model) :
    title = models.CharField(
            max_length=200,
            validators=[MinLengthValidator(2, "Title must be greater than 2 characters")]
    )
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True)
    text = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comments = models.ManyToManyField(settings.AUTH_USER_MODEL,
        through='Comment', related_name='comments_owned')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Picture
    picture = models.BinaryField(null=True, editable=True, blank=True)
    content_type = models.CharField(max_length=256, null=True, help_text='The MIMEType of the file')
    # Shows up in the admin list
    def __str__(self):
        return self.title


class Comment(models.Model) :
    text = models.TextField(
        validators=[MinLengthValidator(3, "Comment must be greater than 3 characters")]
    )

    ad = models.ForeignKey(Ad, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Shows up in the admin list
    def __str__(self):
        if len(self.text) < 15 : return self.text
        return self.text[:11] + ' ...'


######################################################################################
#####################               New models for clothing         ##################
######################################################################################

class Gender(models.Model) :
    name = models.CharField(
            max_length=200,
            validators=[MinLengthValidator(2, "Name must be greater than 2 characters")]
    )

    # Shows up in the admin list
    def __str__(self):
        return self.name

class Nation(models.Model) :
    name = models.CharField(
            max_length=200,
            validators=[MinLengthValidator(2, "Name must be greater than 2 characters")]
    )
    picture = models.BinaryField(null=True, editable=True, blank=True)
    # Shows up in the admin list
    def __str__(self):
        return self.name

class Season(models.Model) :
    name = models.CharField(
            max_length=200,
            validators=[MinLengthValidator(2, "Title must be greater than 2 characters")]
    )
    discription = models.TextField(
        validators=[MinLengthValidator(3, "Discription must be greater than 3 characters")]
    )
    # Shows up in the admin list
    def __str__(self):
        return self.name

class Category(models.Model) :
    name = models.CharField(
            max_length=200,
            validators=[MinLengthValidator(2, "Title must be greater than 2 characters")]
    )
    discription = models.TextField(
        validators=[MinLengthValidator(3, "Discription must be greater than 3 characters")]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Shows up in the admin list
    def __str__(self):
        return self.name

class Brand(models.Model) :
    name = models.CharField(
            max_length=200,
            validators=[MinLengthValidator(2, "Title must be greater than 2 characters")]
    )
    discription = models.TextField(
        validators=[MinLengthValidator(3, "Discription must be greater than 3 characters")]
    )
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nation = models.ForeignKey(Nation, on_delete=models.CASCADE, null=True)
    categories = models.ManyToManyField(Category, help_text='Choose the categories this brand have')
    genders = models.ManyToManyField(Gender, help_text='Choose the target genders this brand have')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    picture = models.BinaryField(null=True, editable=True, blank=True)
    # Shows up in the admin list
    def __str__(self):
        return self.name


class Product(models.Model) :
    name = models.CharField(
            max_length=200,
            validators=[MinLengthValidator(2, "Title must be greater than 2 characters")]
    )
    discription = models.TextField(
        validators=[MinLengthValidator(3, "Discription must be greater than 3 characters")]
    )
    comments = models.ManyToManyField(settings.AUTH_USER_MODEL,
        through='CommentRating', related_name='CommentRatings_owned')
    sales = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category, help_text='Choose the categories this brand have')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    picture = models.BinaryField(null=True, editable=True, blank=True)
    # Shows up in the admin list
    def __str__(self):
        return self.name

class CommentRating(models.Model) :
    text = models.TextField(
        validators=[MinLengthValidator(3, "Comment must be greater than 3 characters")]
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(
        default=5,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
     )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Shows up in the admin list
    def __str__(self):
        if len(self.text) < 15 : return self.text
        return self.text[:11] + ' ...'