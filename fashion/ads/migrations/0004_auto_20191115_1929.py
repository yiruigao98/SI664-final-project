# Generated by Django 2.2.6 on 2019-11-15 19:29

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ads', '0003_auto_20191115_0211'),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(2, 'Title must be greater than 2 characters')])),
                ('discription', models.TextField(validators=[django.core.validators.MinLengthValidator(3, 'Discription must be greater than 3 characters')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(2, 'Title must be greater than 2 characters')])),
                ('discription', models.TextField(validators=[django.core.validators.MinLengthValidator(3, 'Discription must be greater than 3 characters')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='CommentRating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(validators=[django.core.validators.MinLengthValidator(3, 'Comment must be greater than 3 characters')])),
                ('rating', models.IntegerField(default=5, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Gender',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(2, 'Name must be greater than 2 characters')])),
            ],
        ),
        migrations.CreateModel(
            name='Season',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(2, 'Title must be greater than 2 characters')])),
                ('discription', models.TextField(validators=[django.core.validators.MinLengthValidator(3, 'Discription must be greater than 3 characters')])),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, validators=[django.core.validators.MinLengthValidator(2, 'Title must be greater than 2 characters')])),
                ('discription', models.TextField(validators=[django.core.validators.MinLengthValidator(3, 'Discription must be greater than 3 characters')])),
                ('sales', models.PositiveIntegerField(default=0)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ads.Brand')),
                ('categories', models.ManyToManyField(help_text='Choose the categories this brand have', to='ads.Category')),
                ('comments', models.ManyToManyField(related_name='CommentRatings_owned', through='ads.CommentRating', to=settings.AUTH_USER_MODEL)),
                ('gender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ads.Gender')),
                ('season', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ads.Season')),
            ],
        ),
        migrations.AddField(
            model_name='commentrating',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ads.Product'),
        ),
        migrations.AddField(
            model_name='brand',
            name='categories',
            field=models.ManyToManyField(help_text='Choose the categories this brand have', to='ads.Category'),
        ),
        migrations.AddField(
            model_name='brand',
            name='genders',
            field=models.ManyToManyField(help_text='Choose the target genders this brand have', to='ads.Gender'),
        ),
    ]
