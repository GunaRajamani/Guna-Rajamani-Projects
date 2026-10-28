import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { getTestimonials } from "../api/services";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials().then(setItems).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading eyebrow="Client Feedback" title="What Our Clients Say"
          description="Honest feedback from contractors, landowners and engineers we have worked with." />
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-56 rounded-2xl bg-gray-100 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-7 hover:shadow-lg hover:shadow-brand-gray/5 transition-shadow duration-300">
                <FaQuoteLeft className="text-brand-yellow/40 text-3xl mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-1 mb-3 text-brand-yellow">
                  {Array.from({ length: t.rating }).map((_, idx) => <FaStar key={idx} size={14} />)}
                </div>
                <p className="font-heading font-semibold text-brand-gray">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
