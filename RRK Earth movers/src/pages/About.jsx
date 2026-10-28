import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us — Trusted Earthmoving Contractor"
        description="Learn about RRK Earth Movers — owner-operated earthmoving and construction contracting in Thiruvallur, Tamil Nadu, led by R. Rajesh Kumar. 12+ years, 350+ projects."
        canonical="/about" />
      <PageHeader title="About RRK Earth Movers" subtitle="Owner-operated. Field-tested. Built on reliability." />
      <About />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
