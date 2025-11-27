import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const partners = [
  {
    name: "Rajesh Wadhwa",
    title: "Founding Partner",
    specialization: "Corporate Law & M&A",
    bio: "Rajesh Wadhwa founded the firm in 1985 with a vision to provide exceptional legal services. With over 35 years of experience, he has advised on landmark corporate transactions and continues to lead the firm's corporate practice. He is recognized as one of the leading M&A lawyers in India.",
    education: ["LLB, University of Delhi", "LLM, Harvard Law School"],
    practiceAreas: ["Corporate Law", "Mergers & Acquisitions", "Joint Ventures"],
    image: null,
    initials: "RW",
  },
  {
    name: "Priya Sharma",
    title: "Senior Partner",
    specialization: "Commercial Litigation",
    bio: "Priya joined the firm in 1998 and has built an exceptional litigation practice. She has successfully represented clients in the Supreme Court and various High Courts in complex commercial disputes. Her strategic approach and courtroom expertise have earned her recognition as a leading litigator.",
    education: ["LLB, National Law School", "LLM, Cambridge University"],
    practiceAreas: ["Commercial Litigation", "Arbitration", "Appellate Practice"],
    image: null,
    initials: "PS",
  },
  {
    name: "Amit Patel",
    title: "Partner",
    specialization: "Real Estate & Property",
    bio: "Amit heads the real estate practice at Wadhwa & Co. He has advised on major development projects and property transactions across the country. His expertise spans residential, commercial, and industrial real estate, with a focus on complex development projects.",
    education: ["LLB, Government Law College", "MBA, IIM Ahmedabad"],
    practiceAreas: ["Real Estate", "Property Transactions", "Development Projects"],
    image: null,
    initials: "AP",
  },
  {
    name: "Neha Kapoor",
    title: "Partner",
    specialization: "Intellectual Property",
    bio: "Neha leads the intellectual property practice and has extensive experience in patent prosecution, trademark protection, and IP litigation. She has advised leading technology companies and has been involved in several landmark IP cases.",
    education: ["LLB, NLSIU", "MS in Technology Law, Stanford"],
    practiceAreas: ["Patents", "Trademarks", "IP Litigation"],
    image: null,
    initials: "NK",
  },
];

const associates = [
  {
    name: "Vikram Singh",
    title: "Senior Associate",
    specialization: "Corporate Law",
    image: null,
    initials: "VS",
  },
  {
    name: "Ananya Mehta",
    title: "Senior Associate",
    specialization: "Litigation",
    image: null,
    initials: "AM",
  },
  {
    name: "Rahul Khanna",
    title: "Associate",
    specialization: "Real Estate",
    image: null,
    initials: "RK",
  },
  {
    name: "Deepika Reddy",
    title: "Associate",
    specialization: "Tax Advisory",
    image: null,
    initials: "DR",
  },
  {
    name: "Sanjay Kumar",
    title: "Associate",
    specialization: "Intellectual Property",
    image: null,
    initials: "SK",
  },
  {
    name: "Meera Nair",
    title: "Associate",
    specialization: "Employment Law",
    image: null,
    initials: "MN",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                Our Team
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Meet Our Attorneys
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Our team of experienced attorneys brings together diverse expertise 
                and a shared commitment to excellence in serving our clients.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="mb-16">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Partners
              </h2>
              <p className="text-muted-foreground">
                Leading our practice with decades of combined experience
              </p>
            </div>

            <div className="grid gap-8">
              {partners.map((partner) => (
                <Card
                  key={partner.name}
                  className="border border-border/50 overflow-visible"
                  data-testid={`card-partner-${partner.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-4 gap-8">
                      <div className="p-8 flex flex-col items-center text-center md:border-r border-border/50 bg-muted/30">
                        <Avatar className="w-32 h-32 mb-4 border-4 border-gold/20">
                          <AvatarImage
                            src={partner.image || undefined}
                            alt={partner.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-serif">
                            {partner.initials}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-serif text-xl font-bold text-foreground">
                          {partner.name}
                        </h3>
                        <p className="text-gold font-medium text-sm mb-2">
                          {partner.title}
                        </p>
                        <p className="text-muted-foreground text-sm mb-4">
                          {partner.specialization}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-gold"
                          >
                            <Linkedin className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-gold"
                          >
                            <Mail className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-8 md:col-span-3">
                        <p className="text-foreground leading-relaxed mb-6">
                          {partner.bio}
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">
                              Education
                            </h4>
                            <ul className="space-y-2">
                              {partner.education.map((edu) => (
                                <li
                                  key={edu}
                                  className="text-muted-foreground text-sm"
                                >
                                  {edu}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">
                              Practice Areas
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {partner.practiceAreas.map((area) => (
                                <Badge
                                  key={area}
                                  variant="secondary"
                                  className="bg-gold/10 text-gold border-gold/20"
                                >
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>
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
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="mb-16">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Associates
              </h2>
              <p className="text-muted-foreground">
                Our talented team supporting clients across all practice areas
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {associates.map((associate) => (
                <Card
                  key={associate.name}
                  className="border border-border/50 overflow-visible hover-elevate"
                  data-testid={`card-associate-${associate.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-gold/20">
                      <AvatarImage
                        src={associate.image || undefined}
                        alt={associate.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground font-serif">
                        {associate.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {associate.name}
                      </h3>
                      <p className="text-gold text-sm">{associate.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {associate.specialization}
                      </p>
                    </div>
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
              Ready to discuss your legal needs? Contact our team today for 
              a confidential consultation.
            </p>
            <Link href="/contact">
              <Button size="lg" data-testid="button-team-contact">
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
