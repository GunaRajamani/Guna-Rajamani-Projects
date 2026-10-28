from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CompanyInfoView, ServiceViewSet, ProjectViewSet,
    GalleryImageViewSet, TestimonialViewSet, FAQViewSet, EnquiryViewSet,
)

router = DefaultRouter()
router.register("services",     ServiceViewSet,      basename="service")
router.register("projects",     ProjectViewSet,      basename="project")
router.register("gallery",      GalleryImageViewSet, basename="gallery")
router.register("testimonials", TestimonialViewSet,  basename="testimonial")
router.register("faqs",         FAQViewSet,          basename="faq")
router.register("enquiries",    EnquiryViewSet,      basename="enquiry")

urlpatterns = [
    path("company-info/", CompanyInfoView.as_view(), name="company-info"),
    path("",              include(router.urls)),
]
