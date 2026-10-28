import { FaWhatsapp } from "react-icons/fa";
import { useSiteData } from "../context/SiteDataContext";

export default function WhatsAppButton() {
  const { company } = useSiteData();
  const phone = `91${company.whatsapp_number || company.phone_primary}`;
  const msg   = encodeURIComponent("Hi RRK Earth Movers, I would like to enquire about your services.");
  return (
    <a href={`https://wa.me/${phone}?text=${msg}`} target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform duration-200">
      <FaWhatsapp />
    </a>
  );
}
