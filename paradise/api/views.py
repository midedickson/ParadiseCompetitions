from django.shortcuts import render
from django.db.models import Q
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from paradise.models import *
from .serializers import(
    CouponSerializer, ProductSerializer, ProductDetailSerializer, OrderItemSerializer, OrderSerializer, 
    ShippingAddressSerializer, Competition_GroupSerializer, PrizeSerializer, CompetitionSerializer
)

class ProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ProductDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = OrderItem.objects.all()


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.get(customer=self.request.user, complete=False)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")

class CountryListView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(countries, status=HTTP_200_OK)
    
class ShippingAddressListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddress.objects.all()

class ShippingAddressCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddress.objects.all()

class ShippingAddressUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddress.objects.all()


class ShippingAddressDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = ShippingAddress.objects.all()

class CouponCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()

class Competition_GroupView(ListAPIView):
    permission_classes  = (AllowAny,)
    serializer_class = Competition_GroupSerializer
    queryset = Competition_Group.objects.all()

class Competition_GroupDetailView(RetrieveAPIView):
    permission_classes  = (AllowAny,)
    serializer_class = Competition_GroupSerializer
    queryset = Competition_Group.objects.all()


class CompetitionListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = CompetitionSerializer
    queryset = Competition.objects.all()