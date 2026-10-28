import { motion } from "framer-motion";

/**
 * PageHeader — shown at the top of inner pages (About, Services, etc.)
 * Uses admin-uploaded image if available, otherwise a professional CSS gradient.
 * To set a custom image: Admin Panel → Company Info → Hero Image
 */
export default function PageHeader({ title, subtitle, image }) {
  return (
    <section className="relative pt-36 pb-20 flex items-end overflow-hidden">
      <div className="absolute inset-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full"
            style={{ background: "linear-gradient(135deg, #0f1923 0%, #1E3A8A 45%, #1F2937 100%)" }}>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(244,180,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244,180,0,0.3) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gray/60 via-brand-gray/75 to-brand-gray/95" />
      </div>

      <div className="relative z-10 container-px max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="badge-soft bg-white/10 text-brand-yellow mb-4">
          <span className="w-6 h-[2px] bg-brand-yellow rounded-full" />
          RRK Earth Movers
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-white font-heading font-bold text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-3 text-gray-300 max-w-xl text-base sm:text-lg">
            {subtitle}
          </motion.p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 hazard-stripe" />
    </section>
  );
}
