import { useEffect, useState } from "react";
import AdminImageGuide from "./AdminImageGuide";
import { motion } from "framer-motion";
import { FaSearchPlus } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { getGallery } from "../api/services";

const CATEGORIES = [
  { key: "",              label: "All" },
  { key: "excavators",   label: "Excavators" },
  { key: "jcb",          label: "JCB" },
  { key: "motor_grader", label: "Motor Grader" },
  { key: "soil_compactor", label: "Soil Compactor" },
  { key: "rock_breaker", label: "Rock Breaker" },
  { key: "tipper_trucks",label: "Tipper Trucks" },
  { key: "road_works",   label: "Road Works" },
  { key: "railway_works",label: "Railway Works" },
];

export default function Gallery({ limit, bg = "bg-gray-50", showTabs = false }) {
  const [images, setImages]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const params = activeTab ? { category: activeTab } : {};
    setLoading(true);
    getGallery(params)
      .then(d => setImages(limit ? d.slice(0, limit) : d))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, [limit, activeTab]);

  return (
    <section className={`section-padding ${bg}`} id="gallery">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Fleet"
          title="Machinery Gallery"
          description="A closer look at the excavators, loaders, graders, compactors and more we deploy on site."
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: limit || 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <AdminImageGuide type="gallery" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img src={item.image} alt={item.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/70 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                    <FaSearchPlus className="text-brand-yellow text-xl mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-gray-300 text-xs">{item.category_display}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
