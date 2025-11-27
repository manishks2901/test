import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  ArrowLeft,
  CheckCircle,
  Calendar,
  BookOpen,
} from "lucide-react";
import type { Post, Category, TeamMember } from "@shared/schema";

type PostWithRelations = Post & {
  author?: { firstName: string | null; lastName: string | null } | null;
  category?: Category | null;
};

const practiceAreas = {
  "corporate-law": {
    icon: Building2,
    title: "Corporate Law",
    subtitle: "Business Legal Advisory",
    description:
      "Comprehensive corporate legal services including mergers, acquisitions, joint ventures, and corporate governance advisory.",
    fullDescription: `Our Corporate Law practice provides end-to-end legal support for businesses at every stage of their lifecycle. From formation and structuring to complex M&A transactions, our team brings deep expertise and strategic insight to every engagement.

We work with a diverse clientele ranging from startups and emerging companies to established multinational corporations, helping them navigate the complex regulatory landscape while achieving their business objectives.`,
    services: [
      "Mergers & Acquisitions",
      "Corporate Restructuring",
      "Joint Ventures & Strategic Alliances",
      "Corporate Governance",
      "Regulatory Compliance",
      "Securities Law",
      "Private Equity Transactions",
      "Venture Capital Investments",
    ],
    keyBenefits: [
      "Strategic advisory on complex transactions",
      "Cross-border deal expertise",
      "Regulatory navigation and compliance",
      "Long-term business partnership approach",
    ],
    relatedCategories: ["corporate", "mergers-acquisitions", "business"],
  },
  "commercial-litigation": {
    icon: Scale,
    title: "Commercial Litigation",
    subtitle: "Dispute Resolution",
    description:
      "Strategic representation in complex commercial disputes, arbitration, and alternative dispute resolution proceedings.",
    fullDescription: `Our Commercial Litigation practice handles high-stakes disputes across a wide spectrum of industries and forums. We combine aggressive advocacy with sophisticated strategy to achieve optimal outcomes for our clients.

Whether through negotiation, mediation, arbitration, or courtroom litigation, our experienced trial lawyers are equipped to handle the most challenging commercial disputes.`,
    services: [
      "Commercial Contract Disputes",
      "Shareholder Disputes",
      "Banking & Finance Litigation",
      "International Arbitration",
      "Mediation Services",
      "Appellate Practice",
      "Fraud & White Collar Defense",
      "Regulatory Enforcement",
    ],
    keyBenefits: [
      "Proven track record in high-value disputes",
      "Expert arbitration advocacy",
      "Cost-effective dispute resolution strategies",
      "Pan-India litigation capabilities",
    ],
    relatedCategories: ["litigation", "disputes", "arbitration"],
  },
  "real-estate-law": {
    icon: Home,
    title: "Real Estate Law",
    subtitle: "Property & Development",
    description:
      "Expert guidance in property transactions, development projects, lease agreements, and real estate dispute resolution.",
    fullDescription: `Our Real Estate practice covers the full spectrum of property-related legal matters, from simple residential transactions to complex commercial developments. We understand the nuances of real estate law and provide practical, commercially-oriented advice.

Our team assists developers, investors, corporates, and individuals with all aspects of real estate transactions, including due diligence, documentation, regulatory approvals, and dispute resolution.`,
    services: [
      "Property Acquisitions",
      "Development Projects",
      "Commercial Leasing",
      "Real Estate Finance",
      "Title Due Diligence",
      "Property Disputes",
      "RERA Compliance",
      "Land Use & Zoning",
    ],
    keyBenefits: [
      "Comprehensive due diligence expertise",
      "Developer and investor representation",
      "Regulatory navigation (RERA, local laws)",
      "Dispute resolution experience",
    ],
    relatedCategories: ["real-estate", "property", "development"],
  },
  "intellectual-property": {
    icon: Lightbulb,
    title: "Intellectual Property",
    subtitle: "Innovation Protection",
    description:
      "Protection and enforcement of patents, trademarks, copyrights, and trade secrets across all industries.",
    fullDescription: `Our Intellectual Property practice helps clients protect, commercialize, and enforce their intellectual property assets. In today's knowledge-driven economy, IP assets are often among a company's most valuable resources.

We provide strategic counsel on all aspects of IP management, from portfolio development and licensing to enforcement and defense of IP rights.`,
    services: [
      "Patent Registration & Prosecution",
      "Trademark Protection",
      "Copyright Advisory",
      "Trade Secret Protection",
      "IP Licensing",
      "IP Litigation",
      "Technology Transfer",
      "IP Due Diligence",
    ],
    keyBenefits: [
      "Comprehensive IP portfolio management",
      "Strategic licensing and monetization",
      "Enforcement and defense capabilities",
      "Technology sector expertise",
    ],
    relatedCategories: ["intellectual-property", "technology", "patents"],
  },
  "employment-law": {
    icon: Users,
    title: "Employment Law",
    subtitle: "Workplace Advisory",
    description:
      "Advisory on employment contracts, workplace policies, labor disputes, and regulatory compliance matters.",
    fullDescription: `Our Employment Law practice provides comprehensive counsel on all aspects of the employer-employee relationship. We help organizations navigate the complex and evolving landscape of labor and employment regulations.

From policy drafting to dispute resolution, our team offers practical, business-oriented advice that protects our clients while maintaining positive workplace relations.`,
    services: [
      "Employment Contracts",
      "Workplace Policies",
      "Labor Disputes",
      "Termination Advisory",
      "Executive Compensation",
      "POSH Compliance",
      "Industrial Relations",
      "Immigration Advisory",
    ],
    keyBenefits: [
      "Proactive compliance guidance",
      "Employment dispute resolution",
      "Policy development expertise",
      "Executive-level advisory",
    ],
    relatedCategories: ["employment", "labor", "workplace"],
  },
  "tax-advisory": {
    icon: Calculator,
    title: "Tax Advisory",
    subtitle: "Strategic Tax Planning",
    description:
      "Strategic tax planning, compliance assistance, and representation in tax disputes and assessments.",
    fullDescription: `Our Tax Advisory practice helps clients optimize their tax position while ensuring full compliance with applicable tax laws. We provide strategic advice on tax-efficient structuring of transactions and business operations.

Our team represents clients before tax authorities at all levels and has extensive experience in resolving complex tax disputes through negotiation, appellate proceedings, and litigation.`,
    services: [
      "Corporate Tax Planning",
      "Transfer Pricing",
      "GST Advisory",
      "Tax Dispute Resolution",
      "International Taxation",
      "Tax Due Diligence",
      "Tax Compliance",
      "Tax Assessments",
    ],
    keyBenefits: [
      "Proactive tax planning strategies",
      "Dispute resolution expertise",
      "Transaction structuring advice",
      "Multi-jurisdictional experience",
    ],
    relatedCategories: ["tax", "taxation", "compliance"],
  },
  "regulatory-compliance": {
    icon: Shield,
    title: "Regulatory Compliance",
    subtitle: "Regulatory Navigation",
    description:
      "Navigating complex regulatory frameworks and ensuring business compliance across sectors.",
    fullDescription: `Our Regulatory Compliance practice helps businesses navigate the increasingly complex web of regulations that govern their operations. We provide practical guidance that enables compliance while minimizing business disruption.

From financial services to healthcare, our team has deep expertise across multiple regulated sectors and helps clients anticipate and adapt to regulatory changes.`,
    services: [
      "SEBI Compliance",
      "RBI Regulations",
      "FEMA Advisory",
      "Anti-Money Laundering",
      "Data Protection",
      "Industry-Specific Compliance",
      "Regulatory Investigations",
      "License Applications",
    ],
    keyBenefits: [
      "Multi-sector regulatory expertise",
      "Proactive compliance programs",
      "Investigation response",
      "Regulatory relationship management",
    ],
    relatedCategories: ["regulatory", "compliance", "sebi"],
  },
  "contract-drafting": {
    icon: FileText,
    title: "Contract Drafting",
    subtitle: "Legal Documentation",
    description:
      "Expert drafting, review, and negotiation of commercial contracts and legal documentation.",
    fullDescription: `Our Contract Drafting practice provides comprehensive support for all types of commercial agreements. We understand that well-drafted contracts are the foundation of successful business relationships and risk management.

Our team combines legal precision with commercial pragmatism to create documents that protect our clients' interests while facilitating smooth business operations.`,
    services: [
      "Commercial Agreements",
      "Service Contracts",
      "Technology Agreements",
      "Distribution Agreements",
      "Non-Disclosure Agreements",
      "Standard Form Contracts",
      "Contract Negotiations",
      "Template Libraries",
    ],
    keyBenefits: [
      "Risk-balanced drafting",
      "Commercial pragmatism",
      "Efficient template systems",
      "Negotiation support",
    ],
    relatedCategories: ["contracts", "agreements", "drafting"],
  },
};

export default function PracticeAreaDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug as keyof typeof practiceAreas;

  const practiceArea = practiceAreas[slug];

  const { data: relatedPosts } = useQuery<PostWithRelations[]>({
    queryKey: ["/api/posts", { published: true, limit: 6 }],
    enabled: !!practiceArea,
  });

  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
    enabled: !!practiceArea,
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!practiceArea) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16">
            <Scale className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
              Practice Area Not Found
            </h3>
            <p className="text-muted-foreground mb-6">
              The practice area you're looking for doesn't exist.
            </p>
            <Link href="/services">
              <Button data-testid="button-back-to-services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = practiceArea.icon;

  const relatedTeamMembers = teamMembers?.filter((member) =>
    member.practiceAreas?.some((area) =>
      area.toLowerCase().includes(practiceArea.title.split(" ")[0].toLowerCase())
    )
  ).slice(0, 4);

  const filteredPosts = relatedPosts?.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${practiceArea.title} - Legal Services`}
        description={practiceArea.description}
        keywords={`${practiceArea.title.toLowerCase()}, ${practiceArea.services.slice(0, 4).join(", ").toLowerCase()}, legal services, Mumbai law firm`}
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <Link href="/services">
              <Button
                variant="ghost"
                className="text-primary-foreground/70 hover:text-gold mb-6 -ml-4"
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                <Icon className="h-10 w-10 text-gold" />
              </div>
              <div>
                <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
                  {practiceArea.subtitle}
                </Badge>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                  {practiceArea.title}
                </h1>
                <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl">
                  {practiceArea.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-p:text-muted-foreground">
                  {practiceArea.fullDescription.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="mt-12">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Our Services
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {practiceArea.services.map((service) => (
                      <div key={service} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                        <span className="text-muted-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Why Choose Us
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {practiceArea.keyBenefits.map((benefit, i) => (
                      <Card
                        key={i}
                        className="border border-border/50 overflow-visible"
                      >
                        <CardContent className="p-6">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                            <span className="text-gold font-semibold">
                              {i + 1}
                            </span>
                          </div>
                          <p className="text-foreground">{benefit}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <Card className="border border-border/50 overflow-visible">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      Get Expert Advice
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Schedule a consultation with our {practiceArea.title}{" "}
                      experts to discuss your specific requirements.
                    </p>
                    <Link href="/contact">
                      <Button
                        className="w-full bg-gold hover:bg-gold/90 text-gold-foreground border border-gold"
                        data-testid="button-consultation"
                      >
                        Schedule Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {relatedTeamMembers && relatedTeamMembers.length > 0 && (
                  <Card className="border border-border/50 overflow-visible">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                        Practice Leaders
                      </h3>
                      <div className="space-y-4">
                        {relatedTeamMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-3"
                          >
                            <Avatar className="w-12 h-12 border-2 border-gold/30">
                              <AvatarFallback className="bg-gold/10 text-gold text-sm">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground text-sm">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link href="/team">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-4"
                          data-testid="button-view-team"
                        >
                          View Full Team
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {filteredPosts && filteredPosts.length > 0 && (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Related Insights
                  </h2>
                  <p className="text-muted-foreground">
                    Latest articles on {practiceArea.title.toLowerCase()}
                  </p>
                </div>
                <Link href="/insights">
                  <Button variant="outline" data-testid="button-all-insights">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group border border-border/50 overflow-visible hover-elevate"
                    data-testid={`card-insight-${post.id}`}
                  >
                    <CardContent className="p-6">
                      {post.category && (
                        <Badge
                          variant="secondary"
                          className="bg-gold/10 text-gold border-gold/20 mb-4"
                        >
                          {post.category.name}
                        </Badge>
                      )}
                      <Link href={`/insights/${post.slug}`}>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-gold mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Need {practiceArea.title} Assistance?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Our experienced team is ready to help you navigate complex legal
              challenges and protect your interests.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-gold-foreground border border-gold"
                data-testid="button-cta-contact"
              >
                Contact Our Team
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
