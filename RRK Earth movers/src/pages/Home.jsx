import SEO from "../components/SEO";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <SEO title="All Earth & Contract Works — Thiruvallur"
        description="RRK Earth Movers — professional earthmoving, road construction, railway infrastructure and heavy equipment rental in Thiruvallur, Tamil Nadu. Call 8248583199."
        canonical="/" />
      <Hero />
      <About compact />
      <Services limit={6} bg="bg-gray-50" />
      <Projects limit={3} featuredOnly bg="bg-white" />
      <WhyChooseUs />
      <Testimonials />
      <FAQ bg="bg-white" />
      <Contact />
    </>
  );
}
