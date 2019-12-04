from django import forms
from fashions.models import Gender, Nation, Season, Category, Brand, Product, CommentRating, ProductImage
from django.core.files.uploadedfile import InMemoryUploadedFile
from fashions.humanize import naturalsize
from django.core.validators import MaxValueValidator, MinValueValidator
import pdb
# https://docs.djangoproject.com/en/2.1/topics/http/file-uploads/
# https://stackoverflow.com/questions/2472422/django-file-upload-size-limit
# https://stackoverflow.com/questions/32007311/how-to-change-data-in-django-modelform
# https://docs.djangoproject.com/en/2.1/ref/forms/validation/#cleaning-and-validating-fields-that-depend-on-each-other

# Create the form class.
class NationCreateForm(forms.ModelForm):
    max_upload_limit = 2 * 1024 * 1024
    max_upload_limit_text = naturalsize(max_upload_limit)

    class Meta:
        model = Nation
        fields = ['name']

class CategoryCreateForm(forms.ModelForm):
    max_upload_limit = 2 * 1024 * 1024
    max_upload_limit_text = naturalsize(max_upload_limit)

    class Meta:
        model = Category
        fields = ['name']

class GenderCreateForm(forms.ModelForm):
    max_upload_limit = 2 * 1024 * 1024
    max_upload_limit_text = naturalsize(max_upload_limit)

    class Meta:
        model = Gender
        fields = ['name'] 

class BrandCreateForm(forms.ModelForm):
    max_upload_limit = 2 * 1024 * 1024
    max_upload_limit_text = naturalsize(max_upload_limit)

    # Call this 'picture' so it gets copied from the form to the in-memory model
    # It will not be the "bytes", it will be the "InMemoryUploadedFile"
    # because we need to pull out things like content_type
    picture = forms.FileField(required=False, label='File to Upload <= '+max_upload_limit_text)
    upload_field_name = 'picture'

    def __init__ (self, *args, **kwargs):
        super(BrandCreateForm, self).__init__(*args, **kwargs)
        self.fields["categories"].widget = forms.widgets.CheckboxSelectMultiple()
        self.fields["categories"].help_text = ""
        self.fields["categories"].queryset = Category.objects.all()
        self.fields["genders"].widget = forms.widgets.CheckboxSelectMultiple()
        self.fields["genders"].help_text = ""
        self.fields["genders"].queryset = Gender.objects.all()

    class Meta:
        model = Brand
        fields = ['name', 'description','categories', 'genders', 'nation', 'picture']  # Picture is manual

    # Validate the size of the picture
    def clean(self) :
        cleaned_data = super().clean()
        pic = cleaned_data.get('picture')
        if pic is None : return
        if len(pic) > self.max_upload_limit:
            self.add_error('picture', "File must be < "+self.max_upload_limit_text+" bytes")

    # Convert uploaded File object to a picture
    def save(self, commit=True) :
        instance = super(BrandCreateForm, self).save(commit=False)
        # We only need to adjust picture if it is a freshly uploaded file
        f = instance.picture   # Make a copy
        if isinstance(f, InMemoryUploadedFile):  # Extract data from the form to the model
            bytearr = f.read()#;
            instance.content_type = f.content_type
            instance.picture = bytearr  # Overwrite with the actual image data
        if commit:
            instance.save()

        return instance

# Create the form class.
class ProductCreateForm(forms.ModelForm):
    def __init__ (self, *args, **kwargs):
        super(ProductCreateForm, self).__init__(*args, **kwargs)
        self.fields["categories"].widget = forms.widgets.CheckboxSelectMultiple()
        self.fields["categories"].help_text = ""
        self.fields["categories"].queryset = Category.objects.all()

    class Meta:
        model = Product
        fields = ['name', 'description','categories', 'gender','sales', 'price', 'season', 'brand']  # Picture is manual

class CommentForm(forms.Form):
    comment = forms.CharField(required=False, label = "My Comment Text", max_length=500, min_length=3, strip=True)
    rating = forms.IntegerField(
        required = True,
        label = 'My Rating',
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
     )


class ImageCreateForm(forms.ModelForm):
    max_upload_limit = 2 * 1024 * 1024
    max_upload_limit_text = naturalsize(max_upload_limit)

    # Call this 'picture' so it gets copied from the form to the in-memory model
    # It will not be the "bytes", it will be the "InMemoryUploadedFile"
    # because we need to pull out things like content_type
    picture = forms.FileField(required=False, label='File to Upload <= '+max_upload_limit_text)
    upload_field_name = 'picture'

    class Meta:
        model = ProductImage
        fields = ['name', 'picture']  # Picture is manual

    # Validate the size of the picture
    def clean(self) :
        cleaned_data = super().clean()
        pic = cleaned_data.get('picture')
        if pic is None : return
        if len(pic) > self.max_upload_limit:
            self.add_error('picture', "File must be < "+self.max_upload_limit_text+" bytes")

    # Convert uploaded File object to a picture
    def save(self, commit=True) :
        instance = super(ImageCreateForm, self).save(commit=False)
        # We only need to adjust picture if it is a freshly uploaded file
        f = instance.picture   # Make a copy
        if isinstance(f, InMemoryUploadedFile):  # Extract data from the form to the model
            bytearr = f.read()#;
            instance.content_type = f.content_type
            instance.picture = bytearr  # Overwrite with the actual image data
        if commit:
            instance.save()

        return instance