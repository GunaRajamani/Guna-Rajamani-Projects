import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { getFAQs } from "../api/services";

export default function FAQ({ bg = "bg-gray-50" }) {
  const [faqs, setFaqs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(null);

  useEffect(() => {
    getFAQs().then(setFaqs).catch(() => setFaqs([])).finally(() => setLoading(false));
  }, []);

  if (!loading && faqs.length === 0) return null;

  return (
    <section className={`section-padding ${bg}`} id="faq">
      <div className="container-px max-w-4xl mx-auto">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions"
          description="Everything you need to know about our services, machinery hire, and how we work." />
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-heading font-semibold text-brand-gray pr-4">{faq.question}</span>
                  <motion.span animate={{ rotate: open === faq.id ? 180 : 0 }} transition={{ duration: 0.25 }}
                    className="text-brand-yellow shrink-0">
                    <FaChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === faq.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
