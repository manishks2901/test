import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TeamSection } from "@/components/TeamSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { SEO } from "@/components/SEO";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Wadhwa & Co. | Leading Law Firm Since 1985"
        description="Wadhwa & Co. is a premier law firm providing comprehensive legal services in corporate law, commercial litigation, real estate, intellectual property, and tax advisory since 1985."
        keywords="Wadhwa & Co, law firm, legal services, corporate law, commercial litigation, real estate law, intellectual property, employment law, tax advisory, Mumbai lawyers, India legal"
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <TeamSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
