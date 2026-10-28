import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaPhoneAlt, FaTools } from "react-icons/fa";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1923 0%, #1E3A8A 50%, #1F2937 100%)" }}>

        {/* Grid pattern bg */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(244,180,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244,180,0,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />

        {/* Top hazard stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 hazard-stripe" />
        <div className="absolute bottom-0 left-0 right-0 h-2 hazard-stripe" />

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="relative z-10 text-center container-px max-w-lg mx-auto">

          {/* 404 number */}
          <div className="relative mb-6">
            <p className="font-heading font-extrabold text-[8rem] sm:text-[10rem] leading-none text-white/5 select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-brand-yellow flex items-center justify-center shadow-xl">
                <FaTools className="text-brand-gray text-3xl" />
              </div>
            </div>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved.
            Let us get you back on track.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/"
              className="inline-flex items-center gap-2 bg-brand-yellow text-brand-gray font-bold px-6 py-3 rounded-md hover:bg-white transition-colors duration-200">
              <FaHome /> Back to Home
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors duration-200">
              <FaPhoneAlt /> Contact Us
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {["Home", "Services", "Projects", "Gallery", "Contact"].map(page => (
              <Link key={page} to={`/${page === "Home" ? "" : page.toLowerCase()}`}
                className="hover:text-brand-yellow transition-colors">
                {page}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
