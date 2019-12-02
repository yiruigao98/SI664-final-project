from django.views import View
from django.views import generic
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.urls import reverse_lazy
from django.http import HttpResponse
from fashions.owner import OwnerListView, OwnerDetailView, OwnerCreateView, OwnerUpdateView, OwnerDeleteView
from fashions.models import Gender, Nation, Season, Category, Brand, Product, CommentRating
from fashions.forms import BrandCreateForm, ProductCreateForm, NationCreateForm, CategoryCreateForm, GenderCreateForm
from fashions.forms import CommentForm
from django.urls import reverse


###############################################
################ Nation #######################
###############################################

class NationView(LoginRequiredMixin, View):
    model = Nation
    template_name = "fashions/nation_list.html"

class NationDetailView(OwnerDetailView):
    model = Nation
    template_name = "fashions/nation_detail.html"
    def get(self, request, pk) :
        nation = Nation.objects.get(id=pk)
        brands = Brand.objects.filter(Nation=nation).order_by('-updated_at')
        context = {'brands' : brands}
        return render(request, self.template_name, context)

class NationCreateView(LoginRequiredMixin, View):
    template = "fashions/nation_form.html"
    success_url = reverse_lazy('fashions:all')
    def get(self, request, pk=None) :
        form = NationCreateForm()
        ctx = { 'form': form } 
        return render(request, self.template, ctx)

    def post(self, request, pk=None) :
        form = NationCreateForm(request.POST, request.FILES or None)

        if not form.is_valid() :
            ctx = {'form' : form}
            return render(request, self.template, ctx)

        # Add owner to the model before saving
        nation = form.save(commit=False)
        nation.owner = self.request.user
        nation.save()
        return redirect(self.success_url)

###############################################
################ Gender #######################
###############################################

class GenderView(OwnerListView):
    model = Gender
    template_name = "fashions/gender_list.html"

class GenderDetailView(OwnerDetailView):
    model = Gender
    template_name = "fashions/gender_detail.html"
    def get(self, request, pk) :
        gender = Gender.objects.get(id=pk)
        brands = Brand.objects.filter(Gender=gender).order_by('-updated_at')
        context = {'brands' : brands}
        return render(request, self.template_name, context)

class GenderCreateView(LoginRequiredMixin, View):
    template = "fashions/gender_form.html"
    success_url = reverse_lazy('fashions:all')
    def get(self, request, pk=None) :
        form = GenderCreateForm()
        ctx = { 'form': form } 
        return render(request, self.template, ctx)

    def post(self, request, pk=None) :
        form = GenderCreateForm(request.POST, request.FILES or None)

        if not form.is_valid() :
            ctx = {'form' : form}
            return render(request, self.template, ctx)

        # Add owner to the model before saving
        gender = form.save(commit=False)
        gender.owner = self.request.user
        gender.save()
        return redirect(self.success_url)

###############################################
################ Category #####################
###############################################

class CategoryView(OwnerListView):
    model = Brand
    template_name = "fashions/category_list.html"

class CategoryDetailView(OwnerDetailView):
    model = Category
    template_name = "fashions/category_detail.html"
    def get(self, request, pk) :
        category = Category.objects.get(id=pk)
        brands = Brand.objects.filter(Category=category).order_by('-updated_at')
        context = {'brands' : brands}
        return render(request, self.template_name, context)

class CategoryCreateView(LoginRequiredMixin, View):
    template = "fashions/category_form.html"
    success_url = reverse_lazy('fashions:all')
    def get(self, request, pk=None) :
        form = CategoryCreateForm()
        ctx = { 'form': form } 
        return render(request, self.template, ctx)

    def post(self, request, pk=None) :
        form = CategoryCreateForm(request.POST, request.FILES or None)

        if not form.is_valid() :
            ctx = {'form' : form}
            return render(request, self.template, ctx)

        # Add owner to the model before saving
        category = form.save(commit=False)
        category.owner = self.request.user
        category.save()
        return redirect(self.success_url)

###############################################
################ Brand ########################
###############################################

class FilteredBrandView(OwnerListView):
    model = Brand
    template_name = "fashions/filtered_brand_list.html"
    def get(self, request, category_pk, gender_pk):
        if(category_pk is not -1): 
            category = Category.objects.get(id=category_pk)
        if(gender_pk is not -1): 
            gender = Gender.objects.get(id=gender_pk)
        if(gender_pk == -1):
            brands = Brand.objects.filter(Category=category).order_by('-updated_at')
        elif(category_pk == -1):
            brands = Brand.objects.filter(Gender=gender).order_by('-updated_at')
        else:
            brands = Brand.objects.filter(Category=category, Gender=gender).order_by('-updated_at')
        context = { 'brands' : brands}
        return render(request, self.template_name, context)

# class BrandView(LoginRequiredMixin, View):
#     model = Brand
#     template_name = "fashions/brand_list.html"
class BrandView(OwnerListView):
    model = Brand
    template_name = "fashions/brand_list.html"
    def get(self, request) :
        brands = Brand.objects.all()
        gender_list = Gender.objects.all()
        nation_list = Nation.objects.all()
        category_list = Category.objects.all()
        context = { 'brands' : brands, 'gender_list': gender_list, 'nation_list' : nation_list, 'category_list' : category_list}
        return render(request, self.template_name, context)

class BrandDetailView(OwnerDetailView):
    model = Brand
    template_name = "fashions/brand_detail.html"
    def get(self, request, pk) :
        brand = Brand.objects.get(id=pk)
        products = Product.objects.filter(brand=brand).order_by('-updated_at')
        gender_list = Gender.objects.all()
        context = { 'brands' : brand, 'products': products}
        return render(request, self.template_name, context)

class BrandCreateView(LoginRequiredMixin, View):
    template = "fashions/brand_form.html"
    success_url = reverse_lazy('fashions:brand')
    def get(self, request, pk=None) :
        form = BrandCreateForm()
        ctx = { 'form': form } 
        return render(request, self.template, ctx)

    def post(self, request, pk=None) :
        form = BrandCreateForm(request.POST, request.FILES or None)

        if not form.is_valid() :
            ctx = {'form' : form}
            return render(request, self.template, ctx)

        # Add owner to the model before saving
        brand = form.save(commit=False)
        brand.owner = self.request.user
        brand.save()
        return redirect(self.success_url)

class BrandUpdateView(OwnerUpdateView):
    template = "fashions/brand_form.html"
    success_url = reverse_lazy('fashions:brand')
    def get(self, request, pk) :
        brand = get_object_or_404(Brand, id=pk, owner=self.request.user)
        form = BrandCreateForm(instance=brand)
        ctx = {'form': form }
        return render(request, self.template, ctx)

    def post(self, request, pk=None) :
        brand = get_object_or_404(Brand, id=pk, owner=self.request.user)
        form = BrandCreateForm(request.POST, request.FILES or None, instance=brand)

        if not form.is_valid() :
            ctx = {'form' : form}
            return render(request, self.template, ctx)

        brand = form.save(commit=False)
        brand.save()

        return redirect(self.success_url)

class BrandDeleteView(OwnerDeleteView):
    model = Brand
    template_name = "fashions/brand_delete.html"


def Brand_stream_file(request, pk) :
    brand = get_object_or_404(Brand, id=pk)
    response = HttpResponse()
    response['Content-Type'] = brand.content_type
    response['Content-Length'] = len(brand.picture)
    response.write(brand.picture)
    return response

###############################################
################ Product ######################
###############################################

class FilteredProductView(OwnerListView):
    model = Product
    template_name = "fashions/filtered_product_list.html"
    def get(self, request, category_pk, gender_pk, season_pk):
        if(category_pk is not -1): 
            category = Category.objects.get(id=category_pk)
        if(gender_pk is not -1): 
            gender = Gender.objects.get(id=gender_pk)
        if(gender_pk == -1):
            products = Product.objects.filter(Category=category).order_by('-updated_at')
        elif(category_pk == -1):
            products = Product.objects.filter(Gender=gender).order_by('-updated_at')
        else:
            products = Product.objects.filter(Category=category, Gender=gender).order_by('-updated_at')
        context = { 'products' : products}
        return render(request, self.template_name, context)

class ProductView(OwnerListView):
    model = Product
    template_name = "fashions/product_list.html"

class ProductDetailView(OwnerDetailView):
    model = Product
    template_name = "fashions/product_detail.html"
    def get(self, request, pk) :
        product = Product.objects.get(id=pk)
        comments = CommentRating.objects.filter(product=product).order_by('-updated_at')
        comment_form = CommentForm()
        context = { 'product' : product, 'comments': comments, 'comment_form': comment_form }
        return render(request, self.template_name, context)

class ProductCreateView(LoginRequiredMixin, View):
    template = "fashions/product_form.html"
    success_url = reverse_lazy('fashions:product')
    def get(self, request, pk=None) :
        form = ProductCreateForm()
        ctx = {'form': form } 
        return render(request, self.template, ctx)

    def post(self, request, pk=None) :
        form = ProductCreateForm(request.POST, request.FILES or None)

        if not form.is_valid() :
            ctx = {'form' : form}
            return render(request, self.template, ctx)

        # Add owner to the model before saving
        product = form.save(commit=False)
        product.owner = self.request.user
        product.save()
        return redirect(self.success_url)

class ProductUpdateView(OwnerUpdateView):
    template = "fashions/product_form.html"
    success_url = reverse_lazy('fashions:product')
    def get(self, request, pk) :
        product = get_object_or_404(Product, id=pk, owner=self.request.user)
        form = BrandCreateForm(instance=product)
        ctx = {'form': form }
        return render(request, self.template, ctx)

    def post(self, request, pk=None) :
        product = get_object_or_404(Product, id=pk, owner=self.request.user)
        form = ProductCreateForm(request.POST, request.FILES or None, instance=product)

        if not form.is_valid() :
            ctx = {'form' : form}
            return render(request, self.template, ctx)

        product = form.save(commit=False)
        product.save()

        return redirect(self.success_url)

class ProductDeleteView(OwnerDeleteView):
    model = Product
    template_name = "fashions/product_delete.html"


def Product_stream_file(request, pk) :
    product = get_object_or_404(Product, id=pk)
    response = HttpResponse()
    response['Content-Type'] = product.content_type
    response['Content-Length'] = len(product.picture)
    response.write(product.picture)
    return response


#######################

class CommentCreateView(LoginRequiredMixin, View):
    def post(self, request, pk) :
        a = get_object_or_404(Product, id=pk)
        comment_form = CommentForm(request.POST)

        comment = CommentRating(text=request.POST['comment'], rating = request.POST['rating'] , owner=request.user, product = a)
        comment.save()
        return redirect(reverse('fashions:product_detail', args=[pk]))

class CommentDeleteView(OwnerDeleteView):
    model = CommentRating
    template_name = "fashions/comment_delete.html"
    def get_success_url(self):
        product = self.object.product
        return reverse('fashions:product_detail', args=[product.id])
