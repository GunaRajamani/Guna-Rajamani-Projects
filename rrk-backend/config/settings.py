import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "django-insecure-dev-only-change-in-production")
DEBUG      = os.environ.get("DJANGO_DEBUG", "True") == "True"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",
    "rest_framework",
    "corsheaders",
    "storages",
    "api",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF   = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [{
    "BACKEND": "django.template.backends.django.DjangoTemplates",
    "DIRS": [],
    "APP_DIRS": True,
    "OPTIONS": {"context_processors": [
        "django.template.context_processors.request",
        "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
    ]},
}]

DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE     = "Asia/Kolkata"
USE_I18N = True
USE_TZ   = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── Static files ──────────────────────────────
STATIC_URL  = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# ── Media / Storage ───────────────────────────
USE_S3 = os.environ.get("USE_S3", "False") == "True"
if USE_S3:
    AWS_ACCESS_KEY_ID       = os.environ.get("S3_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY   = os.environ.get("S3_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME", "rrk-earth-movers-media")
    AWS_S3_REGION_NAME      = os.environ.get("S3_REGION", "auto")
    AWS_S3_ENDPOINT_URL     = os.environ.get("S3_ENDPOINT_URL", "")
    AWS_S3_CUSTOM_DOMAIN    = os.environ.get("S3_CUSTOM_DOMAIN", "")
    AWS_DEFAULT_ACL         = "public-read"
    AWS_QUERYSTRING_AUTH    = False
    STORAGES = {
        "default":    {"BACKEND": "config.storage_backends.MediaStorage"},
        "staticfiles":{"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
    }
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"
else:
    STORAGES = {
        "default":    {"BACKEND": "django.core.files.storage.FileSystemStorage"},
        "staticfiles":{"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
    }
    MEDIA_URL  = "/media/"
    MEDIA_ROOT = BASE_DIR / "media"

# ── Email ─────────────────────────────────────
EMAIL_BACKEND       = os.environ.get("EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend")
EMAIL_HOST          = os.environ.get("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT          = int(os.environ.get("EMAIL_PORT", "587"))
EMAIL_USE_TLS       = os.environ.get("EMAIL_USE_TLS", "True") == "True"
EMAIL_HOST_USER     = os.environ.get("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "")
ENQUIRY_NOTIFICATION_EMAIL = os.environ.get("ENQUIRY_NOTIFICATION_EMAIL", "r.rajeshkumarjs@gmail.com")
DEFAULT_FROM_EMAIL  = os.environ.get("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER or "noreply@rrkearth.com")

# ── REST Framework ────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_PAGINATION_CLASS": None,
}

# ── CORS / CSRF ───────────────────────────────
CORS_ALLOWED_ORIGINS = os.environ.get(
    "CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
).split(",")
CSRF_TRUSTED_ORIGINS = os.environ.get("CSRF_TRUSTED_ORIGINS", "http://localhost:5173").split(",")

# ── Cache + Rate limit ────────────────────────
CACHE_URL = os.environ.get("CACHE_URL", "")
if CACHE_URL:
    CACHES = {"default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": CACHE_URL,
        "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
    }}
else:
    CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}


# ── WhatsApp Business API ─────────────────────
WA_PHONE_NUMBER_ID  = os.environ.get("WA_PHONE_NUMBER_ID",  "")
WA_ACCESS_TOKEN     = os.environ.get("WA_ACCESS_TOKEN",     "")
WA_RECIPIENT_NUMBER = os.environ.get("WA_RECIPIENT_NUMBER", "")
