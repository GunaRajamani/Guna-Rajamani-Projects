import { createContext, useContext, useEffect, useState } from "react";
import { getCompanyInfo } from "../api/services";

const SiteDataContext = createContext(null);

const FALLBACK = {
  name: "RRK Earth Movers", owner_name: "R. Rajesh Kumar", owner_title: "Proprietor",
  tagline: "All Earth & Contract Works",
  hero_heading: "All Earth & Contract Works",
  hero_subheading: "Professional Earthmoving, Road Construction, Railway Infrastructure & Heavy Equipment Rental Services",
  hero_description: "RRK Earth Movers provides reliable earthmoving, grading, leveling, road construction, railway works, excavation, and heavy equipment rental services.",
  hero_btn1_text: "Get Free Quote", hero_btn2_text: "View Services",
  hero_image: null, logo: null,
  phone_primary: "8248583199", phone_secondary: "9751291162",
  emergency_contact: "", whatsapp_number: "8248583199",
  email: "r.rajeshkumarjs@gmail.com",
  address: "No.115, NGGO Colony, Thiruvallur, Tamil Nadu",
  map_embed_url: "https://www.google.com/maps?q=Thiruvallur,Tamil%20Nadu&output=embed",
  working_hours: "Mon – Sat, 7:00 AM – 7:00 PM",
  facebook_url: "", instagram_url: "", youtube_url: "", twitter_url: "",
  years_experience: 12, projects_completed: 350, machinery_fleet: 20, happy_clients: 180,
};

export function SiteDataProvider({ children }) {
  const [company, setCompany] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCompanyInfo()
      .then(d => { if (mounted) setCompany(d); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <SiteDataContext.Provider value={{ company, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export const useSiteData = () => useContext(SiteDataContext);
