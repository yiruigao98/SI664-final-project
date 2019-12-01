from django.urls import path, reverse_lazy
from . import views

app_name = 'fashions'
urlpatterns = [
    path('', views.BrandView.as_view(), name = 'all'),
    path('fashions', views.BrandView.as_view(), name = 'fashions'),
    path('category', views.CategoryView.as_view(), name='category'),
    path('category/<int:pk>', views.CategoryDetailView.as_view(), name='category_detail'),
    path('gender', views.CategoryView.as_view(), name='gender'),
    path('gender/<int:pk>', views.CategoryDetailView.as_view(), name='gender_detail'),
    path('nation', views.CategoryView.as_view(), name='nation'),
    path('nation/<int:pk>', views.CategoryDetailView.as_view(), name='nation_detail'),
    path('brand', views.BrandView.as_view(), name='brand'),
    path('brand/<int:category_pk>/<int:gender_pk>', views.FilteredBrandView.as_view(), name='filteredbrand'),
    path('brand/<int:pk>', views.BrandDetailView.as_view(), name='brand_detail'),
    path('brand/create',
        views.BrandCreateView.as_view(success_url=reverse_lazy('fashions:brand')), name='brand_create'),
    path('brand/<int:pk>/update',
        views.BrandUpdateView.as_view(success_url=reverse_lazy('fashions:brand')), name='brand_update'),
    path('brand/<int:pk>/delete',
        views.BrandDeleteView.as_view(success_url=reverse_lazy('fashions:brand')), name='brand_delete'),
    path('brand_picture/<int:pk>', views.Brand_stream_file, name='brand_picture'),
    path('product', views.ProductView.as_view(), name='product'),
    path('product/<int:category_pk>/<int:gender_pk>', views.FilteredProductView.as_view(), name='filteredproduct'),
    path('product/<int:pk>', views.ProductDetailView.as_view(), name='product_detail'),
    path('product/create',
        views.ProductCreateView.as_view(success_url=reverse_lazy('fashion:product')), name='product_create'),
    path('product/<int:pk>/update',
        views.ProductUpdateView.as_view(success_url=reverse_lazy('fashion:product')), name='product_update'),
    path('product/<int:pk>/delete',
        views.ProductDeleteView.as_view(success_url=reverse_lazy('fashion:product')), name='product_delete'),
    path('product_picture/<int:pk>', views.Product_stream_file, name='product_picture'),
    path('product/<int:pk>/comment',
        views.CommentCreateView.as_view(), name='product_comment_create'),
    path('comment/<int:pk>/delete',
        views.CommentDeleteView.as_view(success_url=reverse_lazy('product')), name='product_comment_delete'),
]

# We use reverse_lazy in urls.py to delay looking up the view until all the paths are defined
