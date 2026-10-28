from rest_framework import serializers
from .models import CompanyInfo, Service, Project, GalleryImage, Testimonial, FAQ, Enquiry


class CompanyInfoSerializer(serializers.ModelSerializer):
    logo       = serializers.SerializerMethodField()
    hero_image = serializers.SerializerMethodField()

    class Meta:
        model  = CompanyInfo
        fields = [
            "name", "owner_name", "owner_title", "tagline",
            "about_text", "logo",
            # Hero
            "hero_heading", "hero_subheading", "hero_description",
            "hero_image", "hero_btn1_text", "hero_btn2_text",
            # Contact
            "phone_primary", "phone_secondary", "emergency_contact",
            "whatsapp_number", "email", "address", "map_embed_url", "working_hours",
            # Social
            "facebook_url", "instagram_url", "youtube_url", "twitter_url",
            # Stats
            "years_experience", "projects_completed", "machinery_fleet", "happy_clients",
        ]

    def _abs(self, file):
        request = self.context.get("request")
        if not file:
            return None
        return request.build_absolute_uri(file.url) if request else file.url

    def get_logo(self, obj):       return self._abs(obj.logo)
    def get_hero_image(self, obj): return self._abs(obj.hero_image)


class ServiceSerializer(serializers.ModelSerializer):
    image            = serializers.SerializerMethodField()
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model  = Service
        fields = [
            "id", "title", "slug", "category", "category_display",
            "icon", "short_description", "full_description", "image",
            "order", "is_featured",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return None
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class ProjectSerializer(serializers.ModelSerializer):
    image            = serializers.SerializerMethodField()
    category_display = serializers.CharField(source="get_category_display", read_only=True)
    status_display   = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model  = Project
        fields = [
            "id", "title", "location", "category", "category_display",
            "status", "status_display", "image", "description", "is_featured",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return None
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class GalleryImageSerializer(serializers.ModelSerializer):
    image            = serializers.SerializerMethodField()
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model  = GalleryImage
        fields = ["id", "title", "category", "category_display", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return None
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = ["id", "name", "role", "quote", "rating"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FAQ
        fields = ["id", "question", "answer", "order"]


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Enquiry
        fields = ["id", "name", "phone", "email", "service", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
