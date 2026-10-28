/**
 * ImagePlaceholder — shown when a real image hasn't been uploaded yet.
 * Uses a construction-themed CSS gradient so the site never looks broken.
 * Once the client uploads real images via Django Admin, this is replaced automatically.
 */
export default function ImagePlaceholder({ label = "Add image via Admin Panel", className = "", aspect = "aspect-video" }) {
  return (
    <div className={`${aspect} ${className} relative overflow-hidden rounded-xl flex items-end`}
      style={{
        background: "linear-gradient(135deg, #1F2937 0%, #1E3A8A 50%, #1F2937 100%)",
      }}>
      {/* Hazard stripe accent at top */}
      <div className="absolute top-0 left-0 right-0 h-2"
        style={{ background: "repeating-linear-gradient(135deg, #F4B400, #F4B400 14px, #1F2937 14px, #1F2937 28px)" }} />

      {/* Construction grid pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(244,180,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244,180,0,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

      {/* Centered icon */}
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="32" width="48" height="20" rx="2" fill="#F4B400" fillOpacity="0.3"/>
          <rect x="16" y="20" width="32" height="14" rx="2" fill="#F4B400" fillOpacity="0.5"/>
          <circle cx="18" cy="52" r="5" fill="#F4B400"/>
          <circle cx="46" cy="52" r="5" fill="#F4B400"/>
          <rect x="4" y="28" width="8" height="4" rx="1" fill="#F4B400" fillOpacity="0.7"/>
        </svg>
        <p className="text-white/40 text-xs font-medium tracking-wider uppercase text-center px-4">{label}</p>
      </div>
    </div>
  );
}
