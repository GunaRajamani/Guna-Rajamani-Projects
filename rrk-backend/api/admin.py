from django.contrib import admin
from django.utils.html import format_html
from .models import CompanyInfo, Service, Project, GalleryImage, Testimonial, FAQ, Enquiry


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Branding",      {"fields": ("name", "owner_name", "owner_title", "logo")}),
        ("Hero Section",  {"fields": (
            "hero_heading", "hero_subheading", "hero_description",
            "hero_image", "hero_btn1_text", "hero_btn2_text",
        )}),
        ("About Section", {"fields": ("tagline", "about_text")}),
        ("Contact Details", {"fields": (
            "phone_primary", "phone_secondary", "emergency_contact",
            "whatsapp_number", "email", "address", "map_embed_url", "working_hours",
        )}),
        ("Social Links",  {"fields": ("facebook_url", "instagram_url", "youtube_url", "twitter_url")}),
        ("Headline Stats",{"fields": ("years_experience", "projects_completed", "machinery_fleet", "happy_clients")}),
    )

    def has_add_permission(self, request):
        return not CompanyInfo.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        from django.shortcuts import redirect
        obj, _ = CompanyInfo.objects.get_or_create(pk=1)
        return redirect(f"/admin/api/companyinfo/{obj.pk}/change/")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display  = ("title", "category", "icon", "order", "is_active", "is_featured")
    list_editable = ("order", "is_active", "is_featured")
    list_filter   = ("category", "is_active", "is_featured")
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ("title", "location", "category", "status", "is_featured", "is_active", "order", "thumb")
    list_editable = ("is_featured", "is_active", "order")
    list_filter   = ("category", "status", "is_featured")
    search_fields = ("title", "location")

    def thumb(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;"/>', obj.image.url)
        return "—"
    thumb.short_description = "Preview"


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display  = ("title", "category", "order", "is_active", "thumb")
    list_editable = ("order", "is_active")
    list_filter   = ("category",)

    def thumb(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;"/>', obj.image.url)
        return "—"
    thumb.short_description = "Preview"


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ("name", "role", "rating", "order", "is_active")
    list_editable = ("order", "is_active")


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display  = ("question", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("question",)


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display  = ("name", "phone", "email", "service", "short_message", "is_read", "created_at")
    list_editable = ("is_read",)
    list_filter   = ("is_read", "created_at")
    search_fields = ("name", "phone", "email", "service")
    readonly_fields = ("name", "phone", "email", "service", "message", "created_at")

    def short_message(self, obj):
        return (obj.message[:60] + "…") if len(obj.message) > 60 else obj.message
    short_message.short_description = "Message"

    def has_add_permission(self, request):
        return False
