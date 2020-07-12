from django.urls import path
from .views import (ProductDetailView,
                    ProductListView,
                    OrderItemDeleteView,
                    OrderDetailView,
                    CountryListView,
                    ShippingAddressCreateView,
                    ShippingAddressDeleteView,
                    ShippingAddressListView,
                    ShippingAddressUpdateView,
                    AddCouponView,
                    AddCompetitionToCartView)

urlpatterns = [
    path('addresses/', ShippingAddressListView.as_view(), name='address-list'),
    path('addresses/create/', ShippingAddressCreateView.as_view(),
         name='address-create'),
    path('addresses/<pk>/update/',
         ShippingAddressUpdateView.as_view(), name='address-update'),
    path('addresses/<pk>/delete/',
         ShippingAddressDeleteView.as_view(), name='address-delete'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('add-competition-to-cart/<pk>/',
         AddCompetitionToCartView.as_view(), name='add-to-cart')

]
