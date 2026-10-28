import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { useSiteData } from "../context/SiteDataContext";
import { submitEnquiry, getServices } from "../api/services";

export default function Contact() {
  const { company } = useSiteData();
  const [form, setForm]     = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [services, setServicesList] = useState([]);

  useEffect(() => {
    getServices().then(setServicesList).catch(() => setServicesList([]));
  }, []);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const sendToWhatsApp = () => {
    const wa  = company.whatsapp_number || company.phone_primary;
    const txt = ["New enquiry from RRK Earth Movers website:",
      `Name: ${form.name}`, `Phone: ${form.phone}`,
      form.email    ? `Email: ${form.email}`       : null,
      form.service  ? `Service: ${form.service}`   : null,
      `Message: ${form.message}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/91${wa}?text=${encodeURIComponent(txt)}`, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitEnquiry(form);
      setStatus("success");
      sendToWhatsApp();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section-padding bg-gray-50" id="contact">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading eyebrow="Get In Touch" title="Request a Free Quote"
          description="Tell us about your project and we will get back to you with availability and pricing within the same day." />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-brand-gray to-brand-gray/95 flex items-center justify-between">
              <div>
                <p className="text-white font-heading font-semibold text-lg">Tell us about your project</p>
                <p className="text-gray-400 text-sm mt-0.5">We typically reply within a few hours</p>
              </div>
              <div className="hidden sm:flex w-11 h-11 rounded-full bg-brand-yellow items-center justify-center text-brand-gray text-lg shrink-0">
                <FaPaperPlane />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-3xl mb-4">
                    <FaCheckCircle />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-brand-gray mb-2">Request Sent Successfully</h3>
                  <p className="text-gray-600 max-w-sm">Thanks, {form.name}. We have received your enquiry and will call you back shortly.</p>
                  <p className="text-gray-400 text-sm mt-2 flex items-center gap-1.5">
                    <FaWhatsapp className="text-[#25D366]" /> WhatsApp also opened for instant chat.
                  </p>
                  <button onClick={() => { setStatus("idle"); setForm({ name:"",phone:"",email:"",service:"",message:"" }); }}
                    className="mt-6 text-sm font-medium text-brand-blue underline underline-offset-2">
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                      <FaExclamationTriangle /> Something went wrong. Please try again or call us directly.
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition placeholder:text-gray-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="98765 43210"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition placeholder:text-gray-400" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray mb-1.5">Email <span className="text-gray-400 font-normal">(optional)</span></label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition placeholder:text-gray-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-gray mb-1.5">Service Required</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition bg-white text-gray-700">
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-gray mb-1.5">Project Details <span className="text-red-500">*</span></label>
                    <textarea name="message" rows={5} required value={form.message} onChange={handleChange}
                      placeholder="Site location, machinery needed, expected duration, project type..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition resize-none placeholder:text-gray-400" />
                  </div>
                  <button type="submit" disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-brand-blue-light active:scale-[0.98] transition-all duration-200 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === "submitting" ? "Sending..." : "Send Request"} <FaPaperPlane size={13} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact details */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-brand-gray text-white rounded-2xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-2 hazard-stripe opacity-90" />

              {[
                { icon: <FaPhoneAlt size={15}/>, label: "Call Us",
                  content: [company.phone_primary, company.phone_secondary].filter(Boolean).map(p => (
                    <a key={p} href={`tel:+91${p}`} className="block font-semibold text-[15px] hover:text-brand-yellow transition-colors">+91 {p}</a>
                  ))},
                ...(company.emergency_contact ? [{
                  icon: <FaExclamationTriangle size={15}/>, label: "Emergency (24/7)",
                  content: <a href={`tel:+91${company.emergency_contact}`} className="block font-semibold text-[15px] text-brand-yellow hover:text-white transition-colors">+91 {company.emergency_contact}</a>
                }] : []),
                { icon: <FaWhatsapp size={18}/>, label: "WhatsApp",
                  content: <a href={`https://wa.me/91${company.whatsapp_number||company.phone_primary}`} target="_blank" rel="noopener noreferrer"
                    className="block font-semibold text-[15px] hover:text-brand-yellow transition-colors">Chat with us directly</a>},
                { icon: <FaEnvelope size={15}/>, label: "Email",
                  content: <a href={`mailto:${company.email}`} className="block font-semibold text-[15px] hover:text-brand-yellow transition-colors break-all">{company.email}</a>},
                { icon: <FaMapMarkerAlt size={15}/>, label: "Address",
                  content: <p className="font-semibold text-[15px] leading-snug">{company.address}</p>},
                { icon: <FaClock size={15}/>, label: "Working Hours",
                  content: <p className="font-semibold text-[15px]">{company.working_hours}</p>},
              ].map((row, i, arr) => (
                <div key={row.label}>
                  <div className="flex items-start gap-3.5">
                    <span className="w-11 h-11 rounded-xl bg-brand-yellow text-brand-gray flex items-center justify-center shrink-0">{row.icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">{row.label}</p>
                      {row.content}
                    </div>
                  </div>
                  {i < arr.length - 1 && <div className="h-px bg-white/10 mt-5" />}
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm min-h-[220px]">
              <iframe title="RRK Earth Movers location" src={company.map_embed_url}
                className="w-full h-[220px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
