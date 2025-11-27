import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Rajesh Wadhwa",
    title: "Founding Partner",
    specialization: "Corporate Law & M&A",
    bio: "With over 35 years of experience, Rajesh leads the firm's corporate practice and has advised on landmark transactions.",
    image: null,
    initials: "RW",
  },
  {
    name: "Priya Sharma",
    title: "Senior Partner",
    specialization: "Commercial Litigation",
    bio: "Priya brings two decades of courtroom experience and has successfully represented clients in complex commercial disputes.",
    image: null,
    initials: "PS",
  },
  {
    name: "Amit Patel",
    title: "Partner",
    specialization: "Real Estate & Property",
    bio: "Amit specializes in real estate transactions and has advised on major development projects across the country.",
    image: null,
    initials: "AP",
  },
  {
    name: "Neha Kapoor",
    title: "Partner",
    specialization: "Intellectual Property",
    bio: "Neha heads the IP practice and has extensive experience in patent prosecution and technology licensing.",
    image: null,
    initials: "NK",
  },
];

export function TeamSection() {
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
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className="group border border-border/50 overflow-visible hover-elevate"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-team-${member.name.toLowerCase().replace(/\s/g, '-')}`}
            >
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-gold/20 group-hover:border-gold/40 transition-colors">
                  <AvatarImage src={member.image || undefined} alt={member.name} className="object-cover" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-serif">
                    {member.initials}
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-gold"
                  data-testid={`link-linkedin-${member.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
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
