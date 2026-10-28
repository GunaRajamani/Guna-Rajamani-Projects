import { Helmet } from "react-helmet-async";

const SITE    = "RRK Earth Movers";
const SITE_URL = "https://rrkearth.com"; // update before going live
const OG_IMG   = `${SITE_URL}/og-image.jpg`;

export default function SEO({ title, description, canonical = "", image = OG_IMG, type = "website" }) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Earth Works, Road Construction & Equipment Rental`;
  const fullUrl   = `${SITE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description"         content={description} />
      <link rel="canonical"            href={fullUrl} />
      <meta property="og:type"         content={type} />
      <meta property="og:url"          content={fullUrl} />
      <meta property="og:title"        content={fullTitle} />
      <meta property="og:description"  content={description} />
      <meta property="og:image"        content={image} />
      <meta property="og:site_name"    content={SITE} />
      <meta property="og:locale"       content="en_IN" />
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
      <script type="application/ld+json">{JSON.stringify({
        "@context":"https://schema.org","@type":"LocalBusiness",
        "name": SITE,
        "description": description,
        "url": SITE_URL,
        "telephone": "+918248583199",
        "email": "r.rajeshkumarjs@gmail.com",
        "address": { "@type":"PostalAddress","streetAddress":"No.115, NGGO Colony","addressLocality":"Thiruvallur","addressRegion":"Tamil Nadu","addressCountry":"IN" },
        "geo": { "@type":"GeoCoordinates","latitude":"13.1418","longitude":"79.9098" },
        "openingHours":"Mo-Sa 07:00-19:00","priceRange":"₹₹","image": image,
      })}</script>
    </Helmet>
  );
}
