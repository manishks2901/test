import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Clock } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-8 animate-fade-in">
            <Award className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">
              Established 1985 - Trusted for 40 Years
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Legal Excellence,{" "}
            <span className="text-gold">Trusted Counsel</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Wadhwa & Co. provides comprehensive legal solutions with a 
            commitment to integrity, precision, and achieving exceptional 
            outcomes for our distinguished clients across diverse practice areas.
          </p>

          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold px-8 border border-gold"
                data-testid="button-hero-consultation"
              >
                Schedule Consultation
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
                Explore Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-foreground">500+</p>
                <p className="text-sm text-primary-foreground/70">Cases Won</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-foreground">200+</p>
                <p className="text-sm text-primary-foreground/70">Happy Clients</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-foreground">40+</p>
                <p className="text-sm text-primary-foreground/70">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
