from django.db import models
import random
from django.contrib.auth.models import User


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField()
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.code


class Product(models.Model):
    title = models.CharField(max_length=150)
    digital = models.BooleanField(default=False)
    description = models.TextField()
    image = models.ImageField(
        upload_to='product_images', null=True, blank=True)
    quantity = models.IntegerField(default=5)
    slug = models.SlugField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)
    discount_text = models.CharField(max_length=30)
    allow_discount = models.BooleanField(default=False)

    class Meta:
        ordering = ['-title']

    def __str__(self):
        return self.title

    @property
    def net_price(self):
        if self.allow_discount:
            return self.discount_price
        else:
            return self.price


class Prize(models.Model):
    title = models.CharField(max_length=150)
    image = models.ImageField(upload_to='prizes/', null=True, blank=True)

    def __str__(self):
        return self.title


class Competition_Group(models.Model):
    name = models.CharField(max_length=150)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Competition Group'

    def __str__(self):
        return self.name


class Ecard(models.Model):
    title = models.CharField(max_length=150)
    image = models.ImageField(upload_to='ecards')

    def __str__(self):
        return self.title


TICKET_LETTERS = (
    ('A', 'A'),
    ('B', 'B'),
    ('C', 'C'),
    ('D', 'D'),
    ('E', 'E'),
    ('F', 'F'),
    ('G', 'G'),
    ('H', 'H'),
    ('I', 'I'),
    ('J', 'J'),
    ('K', 'K'),
    ('L', 'L'),
    ('M', 'M'),
    ('N', 'N'),
    ('O', 'O'),
    ('P', 'P'),
    ('Q', 'Q'),
    ('R', 'R'),
    ('S', 'S'),
    ('T', 'T'),
    ('U', 'U'),
    ('V', 'V'),
    ('X', 'X'),
    ('Y', 'Y'),
    ('Z', 'Z'),
)

TICKET_NUMBERS = (
    ('100', '00 - 99'),
    ('200', '000 - 199'),
    ('300', '000 - 299'),
    ('400', '000 - 399'),
    ('500', '000 - 499'),
    ('600', '000 - 599'),
)


class Competition(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False)
    slug = models.SlugField()
    prize_to_win = models.ForeignKey(
        Prize, on_delete=models.CASCADE)
    groups = models.ManyToManyField(
        Competition_Group, related_name='competitions', null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    ticket_start = models.CharField(
        choices=TICKET_LETTERS, max_length=1, default='A')
    ticket_end = models.CharField(
        choices=TICKET_LETTERS, max_length=1, default='E')
    ticket_numbers = models.CharField(
        choices=TICKET_NUMBERS, max_length=3, default='100')
    isFeatured = models.BooleanField(default=False)
    isActive = models.BooleanField(default=True)
    description = models.TextField()
    expiration_date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)
    discount_text = models.CharField(max_length=30)
    allow_discount = models.BooleanField(default=False)
    no_of_winners = models.IntegerField(default=1)

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return self.title

    @ property
    def get_net_price(self):
        price = self.price
        if self.allow_discount:
            price = self.discount_price
        return price

    @property
    def get_associated_product(self):
        ecards = Ecard.objects.all()
        associated_product = random.choice(ecards)
        return associated_product


class Order(models.Model):
    customer = models.ForeignKey(
        User, on_delete=models.CASCADE)
    date_ordered = models.DateTimeField(auto_now_add=True)
    coupon = models.ManyToManyField(Coupon)
    complete = models.BooleanField(default=False)

    @property
    def shipping(self):
        shipping = False
        orderitems = self.orderitem_set.all()
        for i in orderitems:
            if i.product.digital == False:
                shipping = True
        return shipping

    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        if self.coupon:
            if self.coupon.isActive:
                total -= self.coupon.amount
        return total

    def __str__(self):
        return 'Order' + str(self.id)


class OrderItem(models.Model):
    competition = models.ForeignKey(
        Competition, on_delete=models.CASCADE)
    selected_ticket = models.CharField(max_length=4)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total = self.product.net_price * self.quantity
        return total


class ShippingAddress(models.Model):
    customer = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=False)
    city = models.CharField(max_length=200, null=False)
    state = models.CharField(max_length=200, null=False)
    zipcode = models.CharField(max_length=200, null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address


class Winner(models.Model):
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    winning_ticket = models.CharField(max_length=4)


class HowToPLay(models.Model):
    header = models.CharField(max_length=100)
    body = models.TextField(max_length=1000)
