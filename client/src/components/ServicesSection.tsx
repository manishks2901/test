import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Scale,
  Home,
  Lightbulb,
  Users,
  Calculator,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Corporate Law",
    description:
      "Comprehensive corporate legal services including mergers, acquisitions, joint ventures, and corporate governance advisory.",
    slug: "corporate-law",
  },
  {
    icon: Scale,
    title: "Commercial Litigation",
    description:
      "Strategic representation in complex commercial disputes, arbitration, and alternative dispute resolution proceedings.",
    slug: "commercial-litigation",
  },
  {
    icon: Home,
    title: "Real Estate Law",
    description:
      "Expert guidance in property transactions, development projects, lease agreements, and real estate dispute resolution.",
    slug: "real-estate-law",
  },
  {
    icon: Lightbulb,
    title: "Intellectual Property",
    description:
      "Protection and enforcement of patents, trademarks, copyrights, and trade secrets across all industries.",
    slug: "intellectual-property",
  },
  {
    icon: Users,
    title: "Employment Law",
    description:
      "Advisory on employment contracts, workplace policies, labor disputes, and regulatory compliance matters.",
    slug: "employment-law",
  },
  {
    icon: Calculator,
    title: "Tax Advisory",
    description:
      "Strategic tax planning, compliance assistance, and representation in tax disputes and assessments.",
    slug: "tax-advisory",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Our Expertise
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
          {services.map((service, index) => (
            <Card
              key={service.slug}
              className="group border border-border/50 hover:border-gold/30 transition-all duration-300 hover-elevate"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-service-${service.slug}`}
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
                <Link href={`/services/${service.slug}`}>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-gold hover:text-gold/80 font-medium"
                    data-testid={`link-service-${service.slug}`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="lg" variant="outline" data-testid="button-view-all-services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
