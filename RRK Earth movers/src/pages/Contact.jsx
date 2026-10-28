import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";

export default function ContactPage() {
  return (
    <>
      <SEO title="Contact Us — Get a Free Quote"
        description="Contact RRK Earth Movers for earthmoving, road construction, railway works and machinery hire in Thiruvallur. Call 8248583199 / 9751291162 or request a free quote online."
        canonical="/contact" />
      <PageHeader title="Contact Us" subtitle="Reach out for machinery hire, project enquiries, or a free site visit." />
      <Contact />
      <FAQ bg="bg-white" />
    </>
  );
}
