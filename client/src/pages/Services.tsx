import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { ArrowRight, CheckCircle } from "lucide-react";
import { practiceAreas } from "@/lib/practiceAreas";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Legal Services & Practice Areas"
        description="Explore our comprehensive legal services across family law, dispute resolution, criminal law, intellectual property, real estate, taxation, banking and finance, capital markets, commercial, and employment matters."
        keywords="legal services, family law, litigation, dispute resolution, criminal law, intellectual property, real estate, taxation, banking and finance, capital markets, commercial law, employment law, New Delhi"
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                Our Services
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Comprehensive Legal Solutions
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                We offer a full spectrum of legal services, combining deep expertise 
                with a client-focused approach to deliver exceptional outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                Explore
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Practice Areas at a Glance
              </h2>
              <p className="text-muted-foreground">
                Select any area to view the detailed services and approach specific to that practice.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {practiceAreas.map((service, index) => (
                <Card
                  key={`summary-${service.id}`}
                  className="group border border-border/50 hover:border-gold/30 transition-all duration-300 hover-elevate"
                  style={{ animationDelay: `${index * 0.05}s` }}
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
                        data-testid={`link-service-${service.id}-summary`}
                      >
                        Practice Areas
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid gap-12">
              {practiceAreas.map((service, index) => (
                <Card
                  key={service.id}
                  id={service.id}
                  className="border border-border/50 overflow-visible"
                  data-testid={`card-service-detail-${service.id}`}
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="p-8 md:p-10 bg-muted/30 md:border-r border-border/50">
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                          <service.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                          {service.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="p-8 md:p-10 md:col-span-2">
                        <h3 className="font-semibold text-foreground mb-6">
                          Our Services Include:
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                          {service.services.map((detail) => (
                            <div
                              key={detail}
                              className="flex items-center gap-3"
                            >
                              <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                              <span className="text-muted-foreground">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Link href={`/services/${service.id}`}>
                            <Button
                              variant="outline"
                              data-testid={`button-learn-more-${service.id}`}
                            >
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href="/contact">
                            <Button
                              className="bg-gold hover:bg-gold/90 text-gold-foreground border border-gold"
                              data-testid={`button-inquire-${service.id}`}
                            >
                              Inquire Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Need Legal Assistance?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Contact us today to discuss your legal requirements and learn how 
              our team can help protect your interests.
            </p>
            <Link href="/contact">
              <Button size="lg" data-testid="button-services-contact">
                Request a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
