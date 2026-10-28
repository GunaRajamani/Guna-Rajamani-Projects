import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import Services from "../components/Services";
import Contact from "../components/Contact";

export default function ServicesPage() {
  return (
    <>
      <SEO title="Earthmoving, Road Construction & Equipment Rental Services"
        description="15 professional services — earth cutting, filling, levelling, grading, GSB/WMM, road construction, railway works, excavator hire, JCB hire, motor grader, compactor, rock breaker and tipper services."
        canonical="/services" />
      <PageHeader title="Our Services" subtitle="Earthmoving, road works, railway infrastructure and heavy equipment rental." />
      <Services bg="bg-white" showTabs />
      <Contact />
    </>
  );
}
