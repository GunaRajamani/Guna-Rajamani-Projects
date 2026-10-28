import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <>
      <SEO title="Completed Projects — Road Works, Railway & Earth Works"
        description="Explore completed projects by RRK Earth Movers — road construction, railway earthworks, earth filling, site development and infrastructure projects across Tamil Nadu."
        canonical="/projects" />
      <PageHeader title="Completed Projects" subtitle="Road works, railway infrastructure, earth works and site development across Tamil Nadu." />
      <Projects bg="bg-white" />
    </>
  );
}
