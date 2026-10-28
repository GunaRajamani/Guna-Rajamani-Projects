from rest_framework import viewsets, mixins, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CompanyInfo, Service, Project, GalleryImage, Testimonial, FAQ, Enquiry
from .serializers import (
    CompanyInfoSerializer, ServiceSerializer, ProjectSerializer,
    GalleryImageSerializer, TestimonialSerializer, FAQSerializer, EnquirySerializer,
)
from .email_utils import send_enquiry_notification
from .whatsapp_utils import send_whatsapp_notification


class CompanyInfoView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        obj, _ = CompanyInfo.objects.get_or_create(pk=1)
        return Response(CompanyInfoSerializer(obj, context={"request": request}).data)


class ServiceViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset           = Service.objects.filter(is_active=True)
    serializer_class   = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field       = "slug"

    def get_queryset(self):
        qs       = super().get_queryset()
        category = self.request.query_params.get("category")
        featured = self.request.query_params.get("featured")
        if category:
            qs = qs.filter(category=category)
        if featured in ("1", "true"):
            qs = qs.filter(is_featured=True)
        return qs


class ProjectViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset           = Project.objects.filter(is_active=True)
    serializer_class   = ProjectSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs       = super().get_queryset()
        featured = self.request.query_params.get("featured")
        category = self.request.query_params.get("category")
        if featured in ("1", "true"):
            qs = qs.filter(is_featured=True)
        if category:
            qs = qs.filter(category=category)
        return qs


class GalleryImageViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset           = GalleryImage.objects.filter(is_active=True)
    serializer_class   = GalleryImageSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs       = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        return qs


class TestimonialViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset           = Testimonial.objects.filter(is_active=True)
    serializer_class   = TestimonialSerializer
    permission_classes = [permissions.AllowAny]


class FAQViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset           = FAQ.objects.filter(is_active=True)
    serializer_class   = FAQSerializer
    permission_classes = [permissions.AllowAny]


class EnquiryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Contact form endpoint — saves to DB, emails owner, sends WhatsApp notification.
    Rate limiting removed temporarily for Python 3.14 compatibility.
    Re-add django-ratelimit once Python 3.12 is installed.
    """
    queryset           = Enquiry.objects.all()
    serializer_class   = EnquirySerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        enquiry = serializer.save()
        send_enquiry_notification(enquiry)
        send_whatsapp_notification(enquiry)
