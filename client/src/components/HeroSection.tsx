import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/50 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-12 py-20">
        <div className="max-w-4xl">
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Expertise You Can Trust. Excellence You Can Expect.
          </h1>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            Crafting Legal Strategies That Win.
          </h2>

          <p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            Our firm delivers refined legal craftsmanship backed by deep subject-matter mastery. We focus on offering highly personalised
            solutions, meticulous legal analysis, and strategic representation for clients who demand the highest standards. Every matter—big or
            small—receives the same level of care, rigor, and professional excellence. When you choose us, you choose a partner whose expertise
            you can trust and whose outcomes you can rely on.
          </p>

          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold px-8 border border-gold"
                data-testid="button-hero-consultation"
              >
                Request a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm"
                data-testid="button-hero-services"
              >
                Practice areas
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
