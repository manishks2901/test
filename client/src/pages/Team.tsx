import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";
import { SEO } from "@/components/SEO";
import { fallbackTeamMembers } from "@/lib/teamFallback";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TeamMemberSkeleton({ isPartner }: { isPartner: boolean }) {
  if (isPartner) {
    return (
      <Card className="border border-border/50">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-8 flex flex-col items-center text-center md:border-r border-border/50 bg-muted/30">
              <Skeleton className="w-32 h-32 rounded-full mb-4" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="p-8 md:col-span-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-5 w-24 mb-3" />
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <div>
                  <Skeleton className="h-5 w-28 mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border/50">
      <CardContent className="p-6 flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Team() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const hasTeam = teamMembers && teamMembers.length > 0;
  const resolvedTeam =
    !isLoading && hasTeam ? teamMembers : !isLoading ? fallbackTeamMembers : [];

  const partners = resolvedTeam.filter((m) => m.isPartner);
  const associates = resolvedTeam.filter((m) => !m.isPartner);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Our Team - Experienced Attorneys"
        description="Meet our team of experienced attorneys with expertise in corporate law, litigation, real estate, intellectual property, and more."
        keywords="attorneys, lawyers, legal team, partners, associates, New Delhi lawyers, corporate attorneys, litigation lawyers"
      />
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
              {isLoading ? (
                <>
                  <TeamMemberSkeleton isPartner />
                  <TeamMemberSkeleton isPartner />
                  <TeamMemberSkeleton isPartner />
                </>
              ) : (
                partners.map((partner) => (
                  <Card
                    key={partner.id}
                    className="border border-border/50 overflow-visible"
                    data-testid={`card-partner-${partner.name.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-4 gap-8">
                        <div className="p-8 flex flex-col items-center text-center md:border-r border-border/50 bg-muted/30">
                          <Avatar className="w-32 h-32 mb-4 border-4 border-gold/20">
                            <AvatarImage
                              src={partner.imageUrl || undefined}
                              alt={partner.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-serif">
                              {getInitials(partner.name)}
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
                            {partner.linkedIn && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-gold"
                                asChild
                              >
                                <a href={partner.linkedIn} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="h-5 w-5" />
                                </a>
                              </Button>
                            )}
                            {partner.email && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-gold"
                                asChild
                              >
                                <a href={`mailto:${partner.email}`}>
                                  <Mail className="h-5 w-5" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="p-8 md:col-span-3">
                          <p className="text-foreground leading-relaxed mb-6">
                            {partner.bio}
                          </p>
                          <div className="grid md:grid-cols-2 gap-6">
                            {partner.education && partner.education.length > 0 && (
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
                            )}
                            {partner.practiceAreas && partner.practiceAreas.length > 0 && (
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
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
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
              {isLoading ? (
                <>
                  <TeamMemberSkeleton isPartner={false} />
                  <TeamMemberSkeleton isPartner={false} />
                  <TeamMemberSkeleton isPartner={false} />
                  <TeamMemberSkeleton isPartner={false} />
                  <TeamMemberSkeleton isPartner={false} />
                  <TeamMemberSkeleton isPartner={false} />
                </>
              ) : associates.length === 0 ? (
                <p className="text-muted-foreground">
                  Associate profiles will be updated shortly.
                </p>
              ) : (
                associates.map((associate) => (
                  <Card
                    key={associate.id}
                    className="border border-border/50 overflow-visible hover-elevate"
                    data-testid={`card-associate-${associate.name.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <Avatar className="w-16 h-16 border-2 border-gold/20">
                        <AvatarImage
                          src={associate.imageUrl || undefined}
                          alt={associate.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground font-serif">
                          {getInitials(associate.name)}
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
                ))
              )}
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
