import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ContactSection } from "@/components/ContactSection";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contact Us - Schedule a Consultation"
        description="Contact Wadhwa & Co. to schedule a confidential consultation with our experienced attorneys. Office located in New Delhi."
        keywords="contact lawyer, legal consultation, law firm contact, New Delhi lawyer, schedule consultation, legal advice"
      />
      <Header />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
