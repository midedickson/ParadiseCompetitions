from django.contrib import admin
from .models import *


class CompetitionAdmin(admin.ModelAdmin):
    date_hierarchy = 'date_created'
    list_display = ('title', 'price', 'discount_price', 'expiration_date')
    list_display_links = ('title', )
    list_editable = ('price', 'discount_price', 'expiration_date')
    search_fields = ('title', )
    filter_horizontal = ('groups', )
    list_filter = ('isActive', 'isFeatured', 'groups')


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('competition', 'quantity', 'selected_ticket')


class OrderAdmin(admin.ModelAdmin):
    date_hierarchy = 'date_ordered'
    list_display = ('customer', 'complete')


admin.site.register(Coupon)
admin.site.register(Product)
admin.site.register(Ecard)
admin.site.register(Prize)
admin.site.register(Competition_Group)
admin.site.register(Competition, CompetitionAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ShippingAddress)
admin.site.register(HowItWorks)
admin.site.register(HowToPLay)
admin.site.register(LiveDraw)
admin.site.register(Winner)
