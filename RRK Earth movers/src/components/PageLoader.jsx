/**
 * PageLoader — shown briefly while SiteDataContext fetches company info.
 * Prevents flash of fallback content on first load.
 */
export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: "#0f1923" }}>
      <div className="absolute top-0 left-0 right-0 h-2 hazard-stripe" />
      <div className="absolute bottom-0 left-0 right-0 h-2 hazard-stripe" />

      {/* Animated logo letters */}
      <div className="flex items-center gap-1 mb-6">
        {["R", "R", "K"].map((letter, i) => (
          <div key={i}
            className="w-14 h-14 rounded-xl bg-brand-blue flex items-center justify-center"
            style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}>
            <span className="font-heading font-bold text-2xl text-brand-yellow">{letter}</span>
          </div>
        ))}
      </div>

      <p className="text-white/60 text-sm tracking-widest uppercase">Earth Movers</p>

      {/* Progress bar */}
      <div className="mt-6 w-48 h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.1)" }}>
        <div className="h-full bg-brand-yellow rounded-full"
          style={{ animation: "loading-bar 1.5s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(-4px); }
        }
        @keyframes loading-bar {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
