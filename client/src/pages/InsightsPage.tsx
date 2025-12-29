import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import InsightsSection from "@/pages/Insights";

export default function InsightsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Insights - Legal Updates"
        description="Read the latest legal insights, updates, and commentary from Wadhwa & Co."
        keywords="legal insights, law firm updates, legal commentary, Wadhwa & Co"
      />
      <Header />
      <main className="flex-1">
        <InsightsSection />
      </main>
      <Footer />
    </div>
  );
}
