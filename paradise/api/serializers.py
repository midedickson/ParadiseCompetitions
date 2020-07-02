from rest_framework import serializers
from paradise.models import *


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

class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
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
    order_items = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    cart_total = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = (
            'order_items',
            'cart_total',
            'coupon',
        )
    def get_order_items(self, obj):
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
    class Meta:
        model = Competition_Group
        fields = '__all__'

        
class PrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prize
        fields = (
            'title',
            'image',
        )

class CompetitionSerializer(serializers.ModelSerializer):
    belong_to = serializers.SerializerMethodField()
    net_price = serializers.SerializerMethodField()
    class Meta:
        model = Competition
        fields = '__all__'
    

    def get_belong_to(self, obj):
        return Competition_GroupSerializer(obj.belong_to).data
    
    def get_net_price(self, obj):
        return obj.get_net_price