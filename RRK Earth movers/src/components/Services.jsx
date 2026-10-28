import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { getServices } from "../api/services";

const CATEGORIES = [
  { key: "",                label: "All Services" },
  { key: "earth_works",    label: "Earth Works" },
  { key: "road_works",     label: "Road Works" },
  { key: "railway_works",  label: "Railway Works" },
  { key: "equipment_rental", label: "Equipment Rental" },
];

export default function Services({ limit, bg = "bg-gray-50", showTabs = false }) {
  const [services, setServices]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const params = activeTab ? { category: activeTab } : {};
    setLoading(true);
    getServices(params)
      .then(d => setServices(limit ? d.slice(0, limit) : d))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [limit, activeTab]);

  return (
    <section className={`section-padding ${bg}`} id="services">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          description="From earth cutting to road construction and railway works — we bring the right machinery and experienced operators to every job."
        />

        {showTabs && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map(c => (
              <button key={c.key} onClick={() => setActiveTab(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === c.key
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-yellow"
                }`}>
                {c.label}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit || 6 }).map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No services found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="group card-surface p-7 flex flex-col">
                <div className="w-14 h-14 rounded-lg bg-brand-blue/8 text-brand-blue flex items-center justify-center text-2xl mb-5 group-hover:bg-brand-yellow group-hover:text-brand-gray transition-colors duration-300">
                  <Icon name={s.icon} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-yellow mb-2">{s.category_display}</span>
                <h3 className="font-heading font-semibold text-lg text-brand-gray mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{s.short_description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
