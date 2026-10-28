import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SiteDataProvider, useSiteData } from "./context/SiteDataContext";
import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Analytics      from "./components/Analytics";
import AppRoutes      from "./routes/AppRoutes";
import PageLoader     from "./components/PageLoader";
import useScrollToTop from "./hooks/useScrollToTop";

function ScrollManager() {
  useScrollToTop();
  return null;
}

function AppContent() {
  const { loading } = useSiteData();

  // Show branded loading screen while company info is fetching
  if (loading) return <PageLoader />;

  return (
    <>
      <ScrollManager />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <SiteDataProvider>
        <BrowserRouter>
          <Analytics />
          <AppContent />
        </BrowserRouter>
      </SiteDataProvider>
    </HelmetProvider>
  );
}
