import { motion } from "framer-motion";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";

export default function Hero() {
  const { company } = useSiteData();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — uses uploaded hero_image from admin, or CSS gradient fallback */}
      <div className="absolute inset-0">
        {company.hero_image ? (
          <img
            src={company.hero_image}
            alt="RRK Earth Movers — construction site"
            className="w-full h-full object-cover"
            fetchpriority="high"
          />
        ) : (
          <div className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, #0f1923 0%, #1E3A8A 40%, #1F2937 70%, #0a0f16 100%)",
            }}>
            {/* Construction grid pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(244,180,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(244,180,0,0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }} />
            {/* Diagonal hazard stripes at bottom-right corner */}
            <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5"
              style={{
                background: "repeating-linear-gradient(135deg, #F4B400, #F4B400 14px, transparent 14px, transparent 28px)",
              }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gray/95 via-brand-gray/75 to-brand-gray/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-gray/90 via-transparent to-transparent" />
      </div>

      {/* Glassmorphism stats card — desktop only */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="rounded-2xl p-6 w-64 space-y-4"
          style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}>
          {[
            { value: `${company.years_experience}+`, label: "Years Experience" },
            { value: `${company.projects_completed}+`, label: "Projects Completed" },
            { value: `${company.machinery_fleet}+`,   label: "Machinery Fleet" },
            { value: `${company.happy_clients}+`,     label: "Happy Clients" },
          ].map((s, i) => (
            <div key={i} className={`flex items-center gap-3 ${i < 3 ? "border-b border-white/10 pb-3" : ""}`}>
              <div>
                <p className="font-heading font-bold text-xl text-brand-yellow">{s.value}</p>
                <p className="text-xs text-gray-300">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-px max-w-7xl mx-auto pt-24">
        <motion.span
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-brand-yellow/15 border border-brand-yellow/40 text-brand-yellow
            font-semibold text-xs sm:text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Thiruvallur, Tamil Nadu
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl">
          {company.hero_heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 text-brand-yellow/90 font-semibold text-base sm:text-lg max-w-2xl">
          {company.hero_subheading}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
          {company.hero_description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4 items-center">
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-brand-yellow text-brand-gray font-bold px-7 py-3.5
              rounded-md hover:bg-white transition-colors duration-200 shadow-lg shadow-black/30">
            {company.hero_btn1_text} <FaArrowRight />
          </Link>
          <Link to="/services"
            className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-7 py-3.5
              rounded-md hover:bg-white hover:text-brand-gray transition-colors duration-200">
            {company.hero_btn2_text}
          </Link>
          <a href={`tel:+91${company.phone_primary}`}
            className="inline-flex items-center gap-2 text-white/70 font-medium hover:text-brand-yellow transition-colors ml-2">
            <FaPhoneAlt size={14} /> {company.phone_primary}
          </a>
        </motion.div>

        {/* Mobile stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          className="xl:hidden mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: `${company.years_experience}+`, label: "Years Experience" },
            { value: `${company.projects_completed}+`, label: "Projects" },
            { value: `${company.machinery_fleet}+`, label: "Machinery" },
            { value: `${company.happy_clients}+`, label: "Happy Clients" },
          ].map((s, i) => (
            <div key={i} className="text-center p-3 rounded-lg"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="font-heading font-bold text-xl text-brand-yellow">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 hazard-stripe" />
    </section>
  );
}
