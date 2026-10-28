from django.db import models
from django.utils.text import slugify


class CompanyInfo(models.Model):
    """Singleton — holds all company-wide editable content."""

    name        = models.CharField(max_length=120, default="RRK Earth Movers")
    owner_name  = models.CharField(max_length=120, default="R. Rajesh Kumar")
    owner_title = models.CharField(max_length=80,  default="Proprietor")
    tagline     = models.CharField(max_length=200, default="All Earth & Contract Works")

    about_text  = models.TextField(blank=True)
    logo        = models.ImageField(upload_to="company/", blank=True, null=True)

    # Hero Section
    hero_heading     = models.CharField(max_length=200, default="All Earth & Contract Works")
    hero_subheading  = models.CharField(
        max_length=300,
        default="Professional Earthmoving, Road Construction, Railway Infrastructure & Heavy Equipment Rental Services",
    )
    hero_description = models.TextField(
        default=(
            "RRK Earth Movers provides reliable earthmoving, grading, leveling, road construction, "
            "railway works, excavation, and heavy equipment rental services. We are committed to "
            "delivering quality workmanship, safety, precision, and timely project completion for "
            "residential, commercial, industrial, and government projects."
        )
    )
    hero_image       = models.ImageField(upload_to="company/", blank=True, null=True)
    hero_btn1_text   = models.CharField(max_length=60, default="Get Free Quote")
    hero_btn2_text   = models.CharField(max_length=60, default="View Services")

    # Contact
    phone_primary         = models.CharField(max_length=20, default="8248583199")
    phone_secondary       = models.CharField(max_length=20, blank=True, default="9751291162")
    emergency_contact     = models.CharField(max_length=20, blank=True, help_text="24/7 emergency contact number")
    whatsapp_number       = models.CharField(max_length=20, blank=True, default="8248583199",
                                             help_text="Digits only, no +91")
    email                 = models.EmailField(default="r.rajeshkumarjs@gmail.com")
    address               = models.CharField(max_length=255, default="No.115, NGGO Colony, Thiruvallur, Tamil Nadu")
    map_embed_url         = models.URLField(blank=True,
                                            default="https://www.google.com/maps?q=Thiruvallur,Tamil%20Nadu&output=embed")
    working_hours         = models.CharField(max_length=120, default="Mon – Sat, 7:00 AM – 7:00 PM",
                                             help_text="e.g. Mon – Sat, 7:00 AM – 7:00 PM")

    # Social
    facebook_url  = models.URLField(blank=True, help_text="https://facebook.com/yourpage")
    instagram_url = models.URLField(blank=True)
    youtube_url   = models.URLField(blank=True)
    twitter_url   = models.URLField(blank=True)

    # Stats
    years_experience    = models.PositiveIntegerField(default=12)
    projects_completed  = models.PositiveIntegerField(default=350)
    machinery_fleet     = models.PositiveIntegerField(default=20)
    happy_clients       = models.PositiveIntegerField(default=180)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "Company Info"
        verbose_name_plural = "Company Info"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass


class Service(models.Model):
    CATEGORY_CHOICES = [
        ("earth_works",    "Earth Works"),
        ("road_works",     "Road Works"),
        ("railway_works",  "Railway Works"),
        ("equipment_rental","Equipment Rental"),
    ]

    title       = models.CharField(max_length=100)
    slug        = models.SlugField(max_length=120, unique=True, blank=True)
    category    = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="earth_works")
    icon        = models.CharField(max_length=60, default="FaHardHat",
                                   help_text="React-icons name e.g. FaRoad, FaTruck, GiMiningHelmet")
    short_description = models.TextField(help_text="Short description shown on service card")
    full_description  = models.TextField(blank=True, help_text="Full detail shown on service detail page")
    image       = models.ImageField(upload_to="services/", blank=True, null=True)
    order       = models.PositiveIntegerField(default=0)
    is_active   = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False, help_text="Show on homepage featured section")

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Project(models.Model):
    CATEGORY_CHOICES = [
        ("road_works",      "Road Works"),
        ("railway_works",   "Railway Works"),
        ("earth_filling",   "Earth Filling"),
        ("earth_cutting",   "Earth Cutting"),
        ("site_development","Site Development"),
        ("infrastructure",  "Infrastructure"),
    ]

    STATUS_CHOICES = [
        ("completed",   "Completed"),
        ("ongoing",     "Ongoing"),
        ("upcoming",    "Upcoming"),
    ]

    title       = models.CharField(max_length=150)
    location    = models.CharField(max_length=120)
    category    = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default="completed")
    image       = models.ImageField(upload_to="projects/")
    description = models.TextField(blank=True)
    order       = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False, help_text="Featured projects show on homepage")
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ("excavators",    "Excavators"),
        ("jcb",           "JCB"),
        ("motor_grader",  "Motor Grader"),
        ("soil_compactor","Soil Compactor"),
        ("rock_breaker",  "Rock Breaker"),
        ("tipper_trucks", "Tipper Trucks"),
        ("road_works",    "Road Works"),
        ("railway_works", "Railway Works"),
    ]

    title    = models.CharField(max_length=120)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="excavators")
    image    = models.ImageField(upload_to="gallery/")
    order    = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    name     = models.CharField(max_length=100)
    role     = models.CharField(max_length=120, blank=True, help_text="e.g. Site Engineer, Avadi")
    quote    = models.TextField()
    rating   = models.PositiveSmallIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.name} ({self.rating}★)"


class FAQ(models.Model):
    """Frequently asked questions shown on the website."""
    question  = models.CharField(max_length=255)
    answer    = models.TextField()
    order     = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


class Enquiry(models.Model):
    """Stores contact form submissions."""
    name       = models.CharField(max_length=120)
    phone      = models.CharField(max_length=20)
    email      = models.EmailField(blank=True)
    service    = models.CharField(max_length=100, blank=True, help_text="Service the customer is enquiring about")
    message    = models.TextField()
    is_read    = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Enquiries"

    def __str__(self):
        return f"{self.name} – {self.phone} ({self.created_at:%d %b %Y})"
