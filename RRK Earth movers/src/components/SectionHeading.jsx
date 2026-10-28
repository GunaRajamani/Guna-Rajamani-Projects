import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-2xl mb-14 ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span className={`badge-soft mb-4 ${light ? "bg-white/10 text-brand-yellow" : ""}`}>
          <span className="w-6 h-[2px] bg-brand-yellow rounded-full" />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold font-heading leading-tight ${light ? "text-white" : "text-brand-gray"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? "text-gray-300" : "text-gray-500"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
