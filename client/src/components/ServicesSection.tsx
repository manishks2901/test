import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { practiceAreas } from "@/lib/practiceAreas";
import { AnimatedReveal } from "@/components/AnimatedReveal";

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Practice Areas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Practice Areas
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We provide comprehensive legal solutions across diverse practice areas,
            combining deep expertise with a client-focused approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {practiceAreas.map((service, index) => (
            <AnimatedReveal key={service.id} delay={0.08 * index}>
              <Card
                className="group border border-border/50 hover:border-gold/30 transition-all duration-300 hover-elevate"
                data-testid={`card-service-${service.id}`}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                    <service.icon className="h-7 w-7 text-primary group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href={`/services/${service.id}`}>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-gold hover:text-gold/80 font-medium"
                      data-testid={`link-service-${service.id}`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </AnimatedReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="lg" variant="outline" data-testid="button-view-all-services">
              View All Practice Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
