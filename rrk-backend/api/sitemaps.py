from django.contrib.sitemaps import Sitemap


class StaticViewSitemap(Sitemap):
    protocol = "https"
    pages = [
        ("/",         1.0, "weekly"),
        ("/about",    0.8, "monthly"),
        ("/services", 0.9, "monthly"),
        ("/projects", 0.8, "monthly"),
        ("/gallery",  0.7, "monthly"),
        ("/contact",  0.9, "yearly"),
    ]

    def items(self):         return self.pages
    def location(self, item): return item[0]
    def priority(self, item): return item[1]
    def changefreq(self, item): return item[2]
