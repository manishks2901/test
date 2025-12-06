import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SEO } from "@/components/SEO";
import { ArrowRight, ArrowLeft, CheckCircle, Calendar, BookOpen } from "lucide-react";
import type { Post, Category, TeamMember } from "@shared/schema";
import { practiceAreaMap } from "@/lib/practiceAreas";

type PostWithRelations = Post & {
  author?: { firstName: string | null; lastName: string | null } | null;
  category?: Category | null;
};

export default function PracticeAreaDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug as keyof typeof practiceAreaMap;

  const practiceArea = practiceAreaMap[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
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
        keywords={`${practiceArea.title.toLowerCase()}, ${practiceArea.services.slice(0, 4).join(", ").toLowerCase()}, legal services, New Delhi law firm`}
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
                        Request a Free Consultation
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
