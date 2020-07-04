from rest_framework import serializers
from paradise.models import *


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = (
            'id',
            'code',
            'amount'
        )


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'digital',
            'description',
            'image',
            'quantity',
            'slug',
            'price',
            'discount_price',
            'discount_text',
        )


class OrderItemSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'product',
            'total',
            'quantity',
        )

    def get_total(self, obj):
        return obj.get_total()


class OrderSerializer(serializers.ModelSerializer):
    cart_items = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    cart_total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'order_items',
            'cart_total',
            'coupon',
        )

    def get_cart_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    def get_cart_total(self, obj):
        return obj.get_total()

    def get_coupon(self, obj):
        if obj.coupon is not None:
            return CouponSerializer(obj.coupon).data
        return None


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = (
            'customer',
            'order',
            'address',
            'city',
            'state',
            'zipcode',
            'date_added',
        )


class Competition_GroupSerializer(serializers.ModelSerializer):
    competitions = serializers.SerializerMethodField()

    class Meta:
        model = Competition_Group
        fields = '__all__'

    def get_competitions(slef, obj):
        return CompetitionSerializer(obj.competitions.filter(isActive=True), many=True).data


class PrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prize
        fields = (
            'title',
            'image',
        )


class EcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ecard
        fields = '__all__'


class CompetitionSerializer(serializers.ModelSerializer):
    net_price = serializers.SerializerMethodField()
    associated_product = serializers.SerializerMethodField()
    groups = StringSerializer(many=True)
    prize_to_win = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = '__all__'

    def get_net_price(self, obj):
        return obj.get_net_price

    def get_associated_product(self, obj):
        return EcardSerializer(obj.get_associated_product, many=False).data

    def get_prize_to_win(self, obj):
        return PrizeSerializer(obj.prize_to_win, many=False).data
