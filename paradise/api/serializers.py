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
    competition = StringSerializer(many=False)

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'competition',
            'selected_ticket',
            'total',
            'quantity',
            'date_added',
        )

    def get_total(self, obj):
        return obj.get_total


class OrderSerializer(serializers.ModelSerializer):
    cart_items = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    cart_total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'cart_items',
            'cart_total',
            'coupon',
        )

    def get_cart_items(self, obj):
        return OrderItemSerializer(obj.orderitem_set.all(), many=True).data

    def get_cart_total(self, obj):
        return obj.get_cart_total

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
        fields = '__all__'


class EcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ecard
        fields = '__all__'


class CompetitionSerializer(serializers.ModelSerializer):
    net_price = serializers.SerializerMethodField()
    associated_product = serializers.SerializerMethodField()
    groups = StringSerializer(many=True)
    prize_to_win = serializers.SerializerMethodField()
    ticket_letter_start = serializers.SerializerMethodField()
    ticket_letter_end = serializers.SerializerMethodField()
    tickets_per_letter = serializers.SerializerMethodField()
    selected_tickets = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = '__all__'

    def get_net_price(self, obj):
        return obj.get_net_price

    def get_associated_product(self, obj):
        return EcardSerializer(obj.get_associated_product, many=False).data

    def get_prize_to_win(self, obj):
        return PrizeSerializer(obj.prize_to_win, many=False).data

    def get_ticket_letter_start(self, obj):
        return obj.get_ticket_letter_start_display()

    def get_ticket_letter_end(self, obj):
        return obj.get_ticket_letter_end_display()

    def get_tickets_per_letter(self, obj):
        return obj.get_tickets_per_letter_display()

    def get_selected_tickets(self, obj):
        return obj.get_selected_tickets


class HowToPlaySerializer(serializers.ModelSerializer):
    class Meta:
        model = HowToPLay
        fields = '__all__'


class HowItWorksSerializer(serializers.ModelSerializer):
    class Meta:
        model = HowItWorks
        fields = '__all__'


class LiveDrawSerializers(serializers.ModelSerializer):
    class Meta:
        model = LiveDraw
        fields = ('appID', 'url', )
