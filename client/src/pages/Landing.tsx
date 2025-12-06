import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TeamSection } from "@/components/TeamSection";
import { SEO } from "@/components/SEO";
import Insights from "@/pages/Insights";
import { ContactSection } from "@/components/ContactSection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [disclaimerNoticeVisible, setDisclaimerNoticeVisible] = useState(true);
  const servicesRef = useRef<HTMLElement | null>(null);
  const teamRef = useRef<HTMLElement | null>(null);
  const insightsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const acknowledged = localStorage.getItem("disclaimerAcknowledged");
    if (!acknowledged) {
      setDisclaimerOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("disclaimerAcknowledged", "true");
    setDisclaimerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Wadhwa & Co. | Bespoke Legal Solutions in New Delhi"
        description="Wadhwa & Co. is a premier law firm providing comprehensive legal services in litigation, dispute resolution, real estate, intellectual property, taxation, and finance from our New Delhi office."
        keywords="Wadhwa & Co, law firm, legal services, litigation, dispute resolution, real estate law, intellectual property, employment law, tax and finance, New Delhi lawyers, India legal"
      />
      <Dialog
        open={disclaimerOpen}
        onOpenChange={(open) => {
          setDisclaimerOpen(open);
          if (!open) {
            localStorage.setItem("disclaimerAcknowledged", "true");
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" asChild>
            <button className="inline-flex items-center justify-center">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Disclaimer</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-3 text-left text-muted-foreground">
                <p>
                  The current rules of the Bar Council of India restrict/prohibit law firms from advertising and soliciting work through communication in the public domain. This website has been designed solely for disseminating basic information about Wadhwa & Co, which is made available at the specific request of the visitor/user. By clicking on &apos;AGREE&apos;, the visitor acknowledges that:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>the contents of this website do not amount to advertising or solicitation;</li>
                  <li>the information provided on the website is meant only for his/her understanding of our activities and who we are of their own volition;</li>
                  <li>the contents of this website do not constitute, and shall not be construed as, legal advice or substitute for legal advice;</li>
                  <li>the use of this website is completely at the user’s own volition and shall not create or amount to an attorney-client relationship;</li>
                  <li>Wadhwa & Co. is not liable for the consequence of any action or decision taken by the visitor by relying on the contents of this website or of any external links on this website;</li>
                  <li>Wadhwa & Co. does not assume any liability for the interpretation or use of the information provided on this website and does not offer any warranty, either express or implied;</li>
                  <li>the contents of this website are the property of Wadhwa & Co. and the visitor is not authorised to use any part thereof, with or without adaptation, without the express prior written consent of Wadhwa & Co.;</li>
                  <li>Wadhwa & Co uses cookies on this website to improve user experience. By continuing to use this website without changing your privacy settings, you agree to the use of cookies.</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button onClick={handleDismiss}>AGREE</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Header />
      <main className="flex-1">
        {disclaimerNoticeVisible && <DisclaimerNotice onClose={() => setDisclaimerNoticeVisible(false)} />}
        <div id="home">
          <HeroSection />
        </div>
        <section ref={servicesRef} id="services">
          <ServicesSection />
        </section>
        <section ref={teamRef} id="team">
          <TeamSection />
        </section>
        <section ref={insightsRef} id="insights">
          <Insights />
        </section>
        <section ref={contactRef} id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
