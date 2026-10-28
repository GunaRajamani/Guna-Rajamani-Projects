import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useSiteData } from "../context/SiteDataContext";
import ImagePlaceholder from "./ImagePlaceholder";

const POINTS = [
  "Owner-operated with direct on-site supervision by R. Rajesh Kumar",
  "Fleet covering excavators, JCBs, graders, compactors, breakers and tippers",
  "Compliant with MoRTH, IRC, and Railway Board specifications",
  "Serving residential, commercial, government and railway projects across Tamil Nadu",
];

export default function About({ compact = false }) {
  const { company } = useSiteData();

  const stats = [
    { label: "Years Experience",   value: `${company.years_experience}+` },
    { label: "Projects Completed", value: `${company.projects_completed}+` },
    { label: "Machinery Fleet",    value: `${company.machinery_fleet}+` },
    { label: "Happy Clients",      value: `${company.happy_clients}+` },
  ];

  return (
    <section className="section-padding bg-white" id="about">
      <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Image column */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
          className="relative">

          {/* Shows real image if uploaded via admin, otherwise gradient placeholder */}
          <div className="rounded-xl w-full h-[420px] overflow-hidden shadow-xl">
            <ImagePlaceholder
              label="Upload machinery photo via Admin Panel → Company Info → Hero Image"
              className="w-full h-full rounded-xl"
              aspect=""
            />
          </div>

          {/* Years badge */}
          <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white rounded-xl px-6 py-5 shadow-lg hidden sm:block">
            <p className="font-heading font-bold text-3xl">{company.years_experience}+</p>
            <p className="text-sm text-blue-100">Years of Excellence</p>
          </div>

          {/* Hazard stripe accent */}
          <div className="absolute -top-4 -left-4 w-16 h-3 rounded-full hidden sm:block"
            style={{ background: "repeating-linear-gradient(135deg, #F4B400, #F4B400 8px, #1F2937 8px, #1F2937 16px)" }} />
        </motion.div>

        {/* Text column */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
          <span className="badge-soft mb-4">
            <span className="w-6 h-[2px] bg-brand-yellow rounded-full" />
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brand-gray leading-tight">
            Trusted Earthmoving &amp; Construction Partner
          </h2>
          <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed">
            {company.about_text ? company.about_text : (
              <>
                <strong className="text-brand-gray">{company.name}</strong> is an owner-operated earthmoving
                and construction contracting business based in Thiruvallur, Tamil Nadu, led by{" "}
                <strong className="text-brand-gray">{company.owner_name}</strong>. With a modern fleet and
                experienced operators, we deliver earth cutting, filling, levelling, grading, road construction,
                railway earthworks, and equipment rental services for residential, commercial, industrial,
                and government projects.
              </>
            )}
          </p>

          {!compact && (
            <ul className="mt-6 space-y-3">
              {POINTS.map(p => (
                <li key={p} className="flex items-start gap-3 text-gray-700">
                  <FaCheckCircle className="text-brand-yellow mt-1 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label}>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-blue">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
