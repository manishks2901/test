import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Discuss Your Legal Needs?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Schedule a confidential consultation with our experienced attorneys 
            to explore how we can help protect your interests.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold px-8 border border-gold"
                data-testid="button-cta-consultation"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:+912212345678">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-cta-call"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/70">
            <a
              href="tel:+912212345678"
              className="flex items-center gap-2 hover:text-gold transition-colors"
              data-testid="link-cta-phone"
            >
              <Phone className="h-5 w-5" />
              <span>+91 22 1234 5678</span>
            </a>
            <a
              href="mailto:contact@wadhwa-law.com"
              className="flex items-center gap-2 hover:text-gold transition-colors"
              data-testid="link-cta-email"
            >
              <Mail className="h-5 w-5" />
              <span>contact@wadhwa-law.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
