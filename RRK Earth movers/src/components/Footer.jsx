import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Logo from "./Logo";
import { useSiteData } from "../context/SiteDataContext";
import { getServices } from "../api/services";

const QUICK_LINKS = [
  { label: "Home", to: "/" }, { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" }, { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" }, { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const { company } = useSiteData();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(d => setServices(d.slice(0, 8))).catch(() => setServices([]));
  }, []);

  const socialLinks = [
    { icon: <FaFacebookF size={14}/>, href: company.facebook_url,  label: "Facebook"  },
    { icon: <FaInstagram size={14}/>, href: company.instagram_url, label: "Instagram" },
    { icon: <FaYoutube   size={14}/>, href: company.youtube_url,   label: "YouTube"   },
    { icon: <FaTwitter   size={14}/>, href: company.twitter_url,   label: "Twitter"   },
    { icon: <FaWhatsapp  size={15}/>, href: `https://wa.me/91${company.whatsapp_number||company.phone_primary}`, label: "WhatsApp" },
  ].filter(s => s.href);

  return (
    <footer className="bg-brand-gray text-gray-300">
      <div className="container-px max-w-7xl mx-auto py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Professional earthmoving, road construction, railway infrastructure and heavy equipment rental services in Thiruvallur, Tamil Nadu.
          </p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2.5 mt-5 flex-wrap">
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-gray transition-colors duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map(l => (
              <li key={l.to}><Link to={l.to} className="text-sm hover:text-brand-yellow transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Our Services</h4>
          <ul className="space-y-2.5">
            {services.map(s => <li key={s.id} className="text-sm text-gray-400">{s.title}</li>)}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <FaPhoneAlt className="text-brand-yellow mt-1 shrink-0" size={13} />
              <div>
                {[company.phone_primary, company.phone_secondary].filter(Boolean).map(p => (
                  <a key={p} href={`tel:+91${p}`} className="block hover:text-brand-yellow transition-colors">+91 {p}</a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <FaEnvelope className="text-brand-yellow mt-1 shrink-0" size={13} />
              <a href={`mailto:${company.email}`} className="break-all hover:text-brand-yellow transition-colors">{company.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <FaMapMarkerAlt className="text-brand-yellow mt-1 shrink-0" size={13} />
              <span>{company.address}</span>
            </li>
            {company.working_hours && (
              <li className="text-gray-400 text-xs pt-1">🕐 {company.working_hours}</li>
            )}
          </ul>
        </div>
      </div>
      <div className="h-1.5 hazard-stripe" />
      <div className="container-px max-w-7xl mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span>Proprietor: {company.owner_name}</span>
      </div>
    </footer>
  );
}
