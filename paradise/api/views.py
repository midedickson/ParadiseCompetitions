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
    CouponSerializer, EcardSerializer, ProductSerializer, OrderItemSerializer, OrderSerializer,
    ShippingAddressSerializer, Competition_GroupSerializer, PrizeSerializer, CompetitionSerializer,
    HowItWorksSerializer, HowToPlaySerializer, LiveDrawSerializers
)


class ProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = OrderItem.objects.all()


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.get(
                customer=self.request.user, complete=False)
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
    permission_classes = (AllowAny,)
    serializer_class = Competition_GroupSerializer
    queryset = Competition_Group.objects.all()


class Competition_GroupDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = Competition_GroupSerializer
    queryset = Competition_Group.objects.all()


class CompetitionListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CompetitionSerializer
    queryset = Competition.objects.filter(isActive=True)


class FeaturedCompetitionListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CompetitionSerializer

    def get_queryset(self):
        qs = Competition.objects.filter(isActive=True)
        featured_qs = qs.filter(isFeatured=True)[:5]
        return featured_qs


class CompetitionDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CompetitionSerializer
    queryset = Competition.objects.all()


class EcardListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = EcardSerializer
    queryset = Ecard.objects.all()


class AddCompetitionToCartView(APIView):
    def post(self, request, *args, **kwargs):
        pk = request.data.get('pk', None)
        if pk is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        competition = get_object_or_404(Competition, id=pk)
        current_order, created = Order.objects.get_or_create(
            customer=self.request.user, complete=False)
        order_item_qs = OrderItem.objects.filter(competition=competition)
        selected_ticket = request.data.get('selected_ticket', None)
        valid = True
        for order_item in order_item_qs:
            if selected_ticket == order_item.selected_ticket:
                valid = False
                break
            else:
                continue

        if valid:
            order_item = OrderItem.objects.create(
                order=current_order, competition=competition, selected_ticket=selected_ticket
            )
            order_item.save()
            return Response({'message': 'Ticket has been Booked, you have 10mins to checkout your cart'}, status=HTTP_200_OK)

        else:
            return Response({'message': 'Ticket has been purchased, Kindly Choose another!'}, status=HTTP_400_BAD_REQUEST)


class RemoveCompetitionFromCartView(APIView):
    def post(self, request, *args, **kwargs):
        id = request.data.get('order_item_id', None)
        if id is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)
        order_item = OrderItem.objects.get(id=id)

        if OrderItem.objects.filter(id=order_item.id).exists():
            order_item.delete()
            return Response({'message': 'Order has been Cancelled'}, status=HTTP_200_OK)

        else:
            return Response({'message': 'No active ticket!'}, status=HTTP_400_BAD_REQUEST)


class HowItWorksListView(ListAPIView):
    serializer_class = HowItWorksSerializer

    def get_queryset(self):
        return HowItWorks.objects.all()[:3]


class HowToPlayListView(ListAPIView):
    serializer_class = HowToPlaySerializer

    def get_queryset(self):
        return HowToPLay.objects.all()[:3]


class LiveDrawsView(RetrieveAPIView):
    serializer_class = LiveDrawSerializers

    def get_queryset(self):
        return LiveDraw.objects.all().first()
