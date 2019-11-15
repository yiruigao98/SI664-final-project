from django.contrib import admin
from ads.models import Gender, Season, Category, Brand, Product, CommentRating, Nation
from ads.models import Ad, Comment
# Register your models here.

# admin.site.register(Ad)
# admin.site.register(Comment)
admin.site.register(Nation)
admin.site.register(Gender)
admin.site.register(Season)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(CommentRating)
