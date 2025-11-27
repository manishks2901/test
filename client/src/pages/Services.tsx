import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import {
  Building2,
  Scale,
  Home,
  Lightbulb,
  Users,
  Calculator,
  Shield,
  FileText,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    id: "corporate-law",
    icon: Building2,
    title: "Corporate Law",
    description:
      "Comprehensive corporate legal services including mergers, acquisitions, joint ventures, and corporate governance advisory.",
    details: [
      "Mergers & Acquisitions",
      "Corporate Restructuring",
      "Joint Ventures & Strategic Alliances",
      "Corporate Governance",
      "Regulatory Compliance",
      "Securities Law",
    ],
  },
  {
    id: "commercial-litigation",
    icon: Scale,
    title: "Commercial Litigation",
    description:
      "Strategic representation in complex commercial disputes, arbitration, and alternative dispute resolution proceedings.",
    details: [
      "Commercial Contract Disputes",
      "Shareholder Disputes",
      "Banking & Finance Litigation",
      "International Arbitration",
      "Mediation Services",
      "Appellate Practice",
    ],
  },
  {
    id: "real-estate-law",
    icon: Home,
    title: "Real Estate Law",
    description:
      "Expert guidance in property transactions, development projects, lease agreements, and real estate dispute resolution.",
    details: [
      "Property Acquisitions",
      "Development Projects",
      "Commercial Leasing",
      "Real Estate Finance",
      "Title Due Diligence",
      "Property Disputes",
    ],
  },
  {
    id: "intellectual-property",
    icon: Lightbulb,
    title: "Intellectual Property",
    description:
      "Protection and enforcement of patents, trademarks, copyrights, and trade secrets across all industries.",
    details: [
      "Patent Registration & Prosecution",
      "Trademark Protection",
      "Copyright Advisory",
      "Trade Secret Protection",
      "IP Licensing",
      "IP Litigation",
    ],
  },
  {
    id: "employment-law",
    icon: Users,
    title: "Employment Law",
    description:
      "Advisory on employment contracts, workplace policies, labor disputes, and regulatory compliance matters.",
    details: [
      "Employment Contracts",
      "Workplace Policies",
      "Labor Disputes",
      "Termination Advisory",
      "Executive Compensation",
      "POSH Compliance",
    ],
  },
  {
    id: "tax-advisory",
    icon: Calculator,
    title: "Tax Advisory",
    description:
      "Strategic tax planning, compliance assistance, and representation in tax disputes and assessments.",
    details: [
      "Corporate Tax Planning",
      "Transfer Pricing",
      "GST Advisory",
      "Tax Dispute Resolution",
      "International Taxation",
      "Tax Due Diligence",
    ],
  },
  {
    id: "regulatory-compliance",
    icon: Shield,
    title: "Regulatory Compliance",
    description:
      "Navigating complex regulatory frameworks and ensuring business compliance across sectors.",
    details: [
      "SEBI Compliance",
      "RBI Regulations",
      "FEMA Advisory",
      "Anti-Money Laundering",
      "Data Protection",
      "Industry-Specific Compliance",
    ],
  },
  {
    id: "contract-drafting",
    icon: FileText,
    title: "Contract Drafting",
    description:
      "Expert drafting, review, and negotiation of commercial contracts and legal documentation.",
    details: [
      "Commercial Agreements",
      "Service Contracts",
      "Technology Agreements",
      "Distribution Agreements",
      "Non-Disclosure Agreements",
      "Standard Form Contracts",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Legal Services & Practice Areas"
        description="Explore our comprehensive legal services including corporate law, commercial litigation, real estate, intellectual property, employment law, and tax advisory."
        keywords="legal services, corporate law, commercial litigation, real estate law, intellectual property, employment law, tax advisory, regulatory compliance, contract drafting"
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

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid gap-12">
              {services.map((service, index) => (
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
                          {service.details.map((detail) => (
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
                Schedule a Consultation
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
