import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SEO } from "@/components/SEO";
import Insights from "@/pages/Insights";
import { ContactSection } from "@/components/ContactSection";
import { X } from "lucide-react";

function DisclaimerNotice({ onClose }: { onClose: () => void }) {
  return (
    <section className="bg-muted/40 border-b border-border/60">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          Disclaimer: The information on this website is for general purposes only and does not constitute legal advice. Accessing this site or communicating with Wadhwa & Co. through it does not create an attorney-client relationship.
        </p>
        <button
          onClick={onClose}
          className="ml-4 inline-flex items-center justify-center rounded-sm p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none flex-shrink-0"
          aria-label="Close disclaimer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

export default function Landing() {
  const [disclaimerNoticeVisible, setDisclaimerNoticeVisible] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Wadhwa & Co. | Bespoke Legal Solutions in New Delhi"
        description="Wadhwa & Co. is a premier law firm providing comprehensive legal services in litigation, dispute resolution, real estate, intellectual property, taxation, and finance from our New Delhi office."
        keywords="Wadhwa & Co, law firm, legal services, litigation, dispute resolution, real estate law, intellectual property, employment law, tax and finance, New Delhi lawyers, India legal"
      />
      <Header />
      <main className="flex-1">
        {disclaimerNoticeVisible && <DisclaimerNotice onClose={() => setDisclaimerNoticeVisible(false)} />}
        <div id="home">
          <HeroSection />
        </div>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="insights">
          <Insights />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
