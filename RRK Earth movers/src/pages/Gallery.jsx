import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import Gallery from "../components/Gallery";

export default function GalleryPage() {
  return (
    <>
      <SEO title="Machinery Gallery — Excavators, JCBs, Graders & More"
        description="See the RRK Earth Movers fleet — excavators, JCB backhoe loaders, motor graders, soil compactors, rock breakers and tipper trucks available for hire in Thiruvallur, Tamil Nadu."
        canonical="/gallery" />
      <PageHeader title="Machinery Gallery" subtitle="Our active fleet of excavators, JCBs, graders, compactors, and tippers." />
      <Gallery bg="bg-white" showTabs />
    </>
  );
}
