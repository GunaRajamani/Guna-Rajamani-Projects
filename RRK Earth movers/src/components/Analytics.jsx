import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID    = import.meta.env.VITE_GA_ID;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

function injectGA() {
  if (!GA_ID || document.getElementById("ga-script")) return;
  const s = document.createElement("script");
  s.id = "ga-script"; s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

function injectPixel() {
  if (!PIXEL_ID || window.fbq) return;
  window.fbq = function() { window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq,arguments) : window.fbq.queue.push(arguments); };
  if (!window._fbq) window._fbq = window.fbq;
  window.fbq.push = window.fbq; window.fbq.loaded = true; window.fbq.version = "2.0"; window.fbq.queue = [];
  const s = document.createElement("script"); s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  window.fbq("init", PIXEL_ID);
}

export default function Analytics() {
  const location = useLocation();
  useEffect(() => { injectGA(); injectPixel(); }, []);
  useEffect(() => {
    if (GA_ID && window.gtag) window.gtag("event","page_view",{ page_path: location.pathname+location.search });
    if (PIXEL_ID && window.fbq) window.fbq("track","PageView");
  }, [location]);
  return null;
}
