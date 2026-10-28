import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useSiteData } from "../context/SiteDataContext";

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery",  to: "/gallery" },
  { label: "Contact",  to: "/contact" },
];

export default function Navbar() {
  const { company } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative font-medium text-sm tracking-wide transition-colors duration-200 hover:text-brand-yellow ${
      isActive ? "text-brand-yellow" : scrolled ? "text-brand-gray" : "text-white"
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)] py-2" : "bg-transparent py-4"
    }`}>
      <div className="container-px max-w-7xl mx-auto flex items-center justify-between">
        <Logo light={!scrolled} />
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:+91${company.phone_primary}`}
            className="inline-flex items-center gap-2 bg-brand-yellow text-brand-gray font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-brand-yellow-dark transition-colors duration-200">
            <FaPhoneAlt size={13} /> Call Now
          </a>
        </div>
        <button className={`lg:hidden text-2xl p-1 ${scrolled ? "text-brand-gray" : "text-white"}`}
          onClick={() => setOpen(p => !p)} aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white shadow-lg">
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(l => (
                <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
                  className={({ isActive }) => `py-3 border-b border-gray-100 font-medium text-base ${isActive ? "text-brand-yellow" : "text-brand-gray"}`}>
                  {l.label}
                </NavLink>
              ))}
              <a href={`tel:+91${company.phone_primary}`}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-gray font-semibold text-sm px-5 py-3 rounded-md">
                <FaPhoneAlt size={13} /> Call Now
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
