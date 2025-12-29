import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

const values = [
  "Client-first counsel grounded in practical outcomes.",
  "Meticulous preparation and disciplined execution.",
  "Clear, timely communication across every matter.",
  "Integrity and accountability in every engagement.",
];

const pillars = [
  {
    title: "Strategic Insight",
    description:
      "We align legal strategy with business realities to protect value and manage risk at every stage.",
  },
  {
    title: "Trusted Advocacy",
    description:
      "Our team combines rigorous research with persuasive advocacy across courts, tribunals, and negotiations.",
  },
  {
    title: "Enduring Partnerships",
    description:
      "We invest in long-term client relationships built on responsiveness, clarity, and results.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="About Us - Wadhwa & Co."
        description="Learn about Wadhwa & Co., our values, and our commitment to delivering trusted legal counsel across New Delhi, Noida, and Chandigarh."
        keywords="about Wadhwa & Co, law firm, legal counsel, New Delhi lawyers, Noida lawyers, Chandigarh lawyers"
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                About Us
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                A Law Firm Built on Trust and Precision
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Wadhwa & Co. delivers bespoke legal solutions across litigation,
                corporate advisory, and specialized practice areas. With offices
                serving New Delhi, Noida, and Chandigarh, we combine strategic
                insight with rigorous execution to protect our clients' interests.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Who We Are
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our team is known for disciplined preparation, thoughtful
                  counsel, and practical solutions. We take the time to
                  understand each client's objectives and craft strategies that
                  balance legal risk with commercial realities.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  From high-stakes disputes to complex transactions, we provide
                  clear guidance and steady advocacy. We measure success by the
                  confidence and clarity our clients gain at every stage.
                </p>
              </div>
              <Card className="border border-border/50">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                    Our Values
                  </h3>
                  <div className="space-y-4">
                    {values.map((value) => (
                      <div key={value} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                Our Approach
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                How We Deliver Results
              </h2>
              <p className="text-muted-foreground">
                We combine strategic clarity, trusted advocacy, and long-term
                partnership to deliver outcomes that matter.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <Card
                  key={pillar.title}
                  className="border border-border/50 bg-background"
                >
                  <CardContent className="p-8">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Work With Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Ready to discuss your legal needs? Our team is here to provide
              clear, confidential guidance.
            </p>
            <Link href="/contact">
              <Button size="lg" data-testid="button-about-contact">
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
