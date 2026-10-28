import { useEffect, useState } from "react";
import AdminImageGuide from "./AdminImageGuide";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { getProjects } from "../api/services";

const STATUS_BADGE = {
  completed: { label: "Completed", cls: "bg-green-100 text-green-700" },
  ongoing:   { label: "Ongoing",   cls: "bg-blue-100 text-blue-700" },
  upcoming:  { label: "Upcoming",  cls: "bg-amber-100 text-amber-700" },
};

export default function Projects({ limit, featuredOnly = false, bg = "bg-white" }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const params = featuredOnly ? { featured: 1 } : {};
    getProjects(params)
      .then(d => setProjects(limit ? d.slice(0, limit) : d))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [limit, featuredOnly]);

  return (
    <section className={`section-padding ${bg}`} id="projects">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Work"
          title="Completed Projects"
          description="A portfolio of earth works, road construction, railway infrastructure and site development delivered across Tamil Nadu."
        />
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit || 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <AdminImageGuide type="projects" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl hover:shadow-brand-gray/15 transition-shadow duration-300 h-72">
                <img src={p.image} alt={p.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray/90 via-brand-gray/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-brand-gray text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  {p.category_display}
                </span>
                {p.status && (
                  <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_BADGE[p.status]?.cls || "bg-gray-100 text-gray-700"}`}>
                    {STATUS_BADGE[p.status]?.label || p.status}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-heading font-semibold text-lg leading-snug">{p.title}</h3>
                  <p className="flex items-center gap-1.5 text-gray-200 text-sm mt-1.5">
                    <FaMapMarkerAlt className="text-brand-yellow" /> {p.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
