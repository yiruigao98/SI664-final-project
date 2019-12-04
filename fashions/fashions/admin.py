from django.contrib import admin
from fashions.models import Gender, Season, Category, Brand, Product, CommentRating, Nation, ProductImage
# Register your models here.

admin.site.register(Nation)
admin.site.register(Gender)
admin.site.register(Season)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(CommentRating)
admin.site.register(ProductImage)

def get_actions(self, request):
    actions = super().get_actions(request)
    if 'delete_selected' in actions:
        del actions['delete_selected']
    return actions