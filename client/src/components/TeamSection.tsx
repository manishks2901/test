import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";
import { fallbackTeamMembers } from "@/lib/teamFallback";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TeamMemberSkeleton() {
  return (
    <Card className="border border-border/50">
      <CardContent className="p-6 text-center">
        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-6" />
        <Skeleton className="h-5 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-24 mx-auto mb-2" />
        <Skeleton className="h-4 w-28 mx-auto mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-8 w-8 rounded-full mx-auto" />
      </CardContent>
    </Card>
  );
}

export function TeamSection() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const resolvedTeam =
    !isLoading && teamMembers && teamMembers.length > 0
      ? teamMembers
      : !isLoading
      ? fallbackTeamMembers
      : [];

  const partners = resolvedTeam.filter((m) => m.isPartner).slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Our Team
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Meet Our Attorneys
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our team of experienced attorneys brings together diverse expertise 
            to provide comprehensive legal solutions for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            <>
              <TeamMemberSkeleton />
              <TeamMemberSkeleton />
              <TeamMemberSkeleton />
              <TeamMemberSkeleton />
            </>
          ) : (
            partners.map((member, index) => (
              <Card
                key={member.id}
                className="group border border-border/50 overflow-visible hover-elevate"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-team-${member.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-gold/20 group-hover:border-gold/40 transition-colors">
                    <AvatarImage src={member.imageUrl || undefined} alt={member.name} className="object-cover" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-serif">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gold text-sm font-medium mb-2">
                    {member.title}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4">
                    {member.specialization}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  {member.linkedIn && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-gold"
                      asChild
                      data-testid={`link-linkedin-${member.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <a href={member.linkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/team">
            <Button size="lg" variant="outline" data-testid="button-view-full-team">
              View Full Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
