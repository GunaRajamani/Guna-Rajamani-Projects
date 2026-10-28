from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from django.http import JsonResponse
from api.sitemaps import StaticViewSitemap

def api_root(request):
    return JsonResponse({"status": "RRK Earth Movers API is running", "version": "2.0"})

sitemaps = {"static": StaticViewSitemap}

urlpatterns = [
    path("",           api_root,  name="api-root"),
    path("admin/",     admin.site.urls),
    path("api/",       include("api.urls")),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header  = "RRK Earth Movers — Admin"
admin.site.site_title   = "RRK Earth Movers Admin"
admin.site.index_title  = "Manage Website Content"
