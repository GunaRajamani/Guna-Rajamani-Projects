import { motion } from "framer-motion";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { whyChooseUs } from "../data/content";

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-brand-gray relative overflow-hidden" id="why-us">
      <div className="absolute inset-0 opacity-[0.03] hazard-stripe" />
      <div className="relative container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The RRK Earth Movers Advantage"
          description="Here is why contractors, developers and government agencies across Thiruvallur keep coming back to us."
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseUs.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="glass rounded-xl p-6 hover:bg-white/15 transition-colors duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-yellow text-brand-gray flex items-center justify-center text-xl mb-4">
                <Icon name={item.icon} />
              </div>
              <h3 className="font-heading font-semibold text-white text-base mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
