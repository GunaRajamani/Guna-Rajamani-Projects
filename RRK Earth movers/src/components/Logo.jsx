import { Link } from "react-router-dom";
import fallback from "../assets/rrk-logo.svg";
import { useSiteData } from "../context/SiteDataContext";

export default function Logo({ light = false }) {
  const { company } = useSiteData();
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
      <span className="w-11 h-11 rounded-md bg-white p-1 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <img src={company.logo || fallback} alt={`${company.name} logo`} className="w-full h-full object-contain" />
      </span>
      <span className="leading-tight">
        <span className={`block font-heading font-bold text-lg tracking-tight ${light ? "text-white" : "text-brand-gray"}`}>
          RRK <span className="text-brand-yellow">Earth Movers</span>
        </span>
        <span className={`block text-[11px] font-medium tracking-wide ${light ? "text-gray-300" : "text-gray-500"}`}>
          Earth Works &amp; Equipment Rental
        </span>
      </span>
    </Link>
  );
}
