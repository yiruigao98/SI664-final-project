from django.urls import path, reverse_lazy
from . import views

app_name = 'fashions'
urlpatterns = [
    path('', views.FashionView.as_view()),
    path('brand', views.BrandView.as_view(), name='brand'),
    path('brand/<int:pk>', views.BrandDetailView.as_view(), name='brand_detail'),
    path('brand/create',
        views.BrandCreateView.as_view(success_url=reverse_lazy('fashions:brand')), name='brand_create'),
    path('brand/<int:pk>/update',
        views.BrandUpdateView.as_view(success_url=reverse_lazy('fashions:brand')), name='brand_update'),
    path('brand/<int:pk>/delete',
        views.BrandDeleteView.as_view(success_url=reverse_lazy('fashions:brand')), name='brand_delete'),
    path('product', views.ProductView.as_view(), name='product'),
    path('product/<int:pk>', views.ProductDetailView.as_view(), name='product_detail'),
    path('product/create',
        views.ProductCreateView.as_view(success_url=reverse_lazy('fashion:product')), name='product_create'),
    path('product/<int:pk>/update',
        views.ProductUpdateView.as_view(success_url=reverse_lazy('fashion:product')), name='product_update'),
    path('product/<int:pk>/delete',
        views.ProductDeleteView.as_view(success_url=reverse_lazy('fashion:product')), name='product_delete'),
    path('product_picture/<int:pk>', views.stream_file, name='product_picture'),
    path('product/<int:pk>/comment',
        views.CommentCreateView.as_view(), name='product_comment_create'),
    path('comment/<int:pk>/delete',
        views.CommentDeleteView.as_view(success_url=reverse_lazy('product')), name='product_comment_delete'),
]

# We use reverse_lazy in urls.py to delay looking up the view until all the paths are defined
