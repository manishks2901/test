import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/SEO";
import type { Post, Category } from "@shared/schema";

type PostWithRelations = Post & {
  author?: { firstName: string | null; lastName: string | null } | null;
  category?: Category | null;
};

export default function InsightDetail() {
  const [, params] = useRoute("/insights/:slug");
  const slug = params?.slug;
  const viewRecorded = useRef(false);

  const { data: post, isLoading } = useQuery<PostWithRelations>({
    queryKey: ["/api/posts", slug],
    enabled: !!slug,
  });

  const recordViewMutation = useMutation({
    mutationFn: async (postId: number) => {
      return apiRequest("POST", `/api/posts/${postId}/view`);
    },
  });

  useEffect(() => {
    if (post && post.id && !viewRecorded.current) {
      viewRecorded.current = true;
      recordViewMutation.mutate(post.id);
    }
  }, [post]);

  const { data: relatedPosts } = useQuery<PostWithRelations[]>({
    queryKey: ["/api/posts", { published: true, limit: 3 }],
    enabled: !!post,
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAuthorInitials = (post: PostWithRelations) => {
    if (post.author?.firstName && post.author?.lastName) {
      return `${post.author.firstName[0]}${post.author.lastName[0]}`;
    }
    return "WC";
  };

  const getAuthorName = (post: PostWithRelations) => {
    if (post.author?.firstName || post.author?.lastName) {
      return `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim();
    }
    return "Wadhwa & Co.";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
              Article not found
            </h3>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/insights">
              <Button data-testid="button-back-to-insights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const otherPosts = relatedPosts?.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={post.title}
        description={post.excerpt || `Read ${post.title} - legal insights from Wadhwa & Co.`}
        keywords={`${post.category?.name || "legal"}, legal insights, law articles, Wadhwa & Co`}
        ogType="article"
        articleAuthor={getAuthorName(post)}
        articlePublishedTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}
      />
      <Header />
      <main className="flex-1">
        <article>
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
              <div className="max-w-4xl">
                <Link href="/insights">
                  <Button
                    variant="ghost"
                    className="text-primary-foreground/70 hover:text-gold mb-6 -ml-4"
                    data-testid="button-back"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Insights
                  </Button>
                </Link>

                {post.category && (
                  <Badge className="bg-gold/20 text-gold border-gold/30 mb-6">
                    {post.category.name}
                  </Badge>
                )}

                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-8 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-primary-foreground/70">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-gold/30">
                      <AvatarFallback className="bg-gold/20 text-gold">
                        {getAuthorInitials(post)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-primary-foreground font-medium">
                        {getAuthorName(post)}
                      </p>
                      <p className="text-sm text-primary-foreground/60">
                        Attorney at Wadhwa & Co.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
              <div className="max-w-3xl mx-auto">
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-gold pl-6">
                    {post.excerpt}
                  </p>
                )}
                <div
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-gold hover:prose-a:text-gold/80"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </section>
        </article>

        {otherPosts && otherPosts.length > 0 && (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
                More Insights
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {otherPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="group border border-border/50 overflow-visible hover-elevate"
                    data-testid={`card-related-${relatedPost.id}`}
                  >
                    <CardContent className="p-6">
                      {relatedPost.category && (
                        <Badge
                          variant="secondary"
                          className="bg-gold/10 text-gold border-gold/20 mb-4"
                        >
                          {relatedPost.category.name}
                        </Badge>
                      )}
                      <Link href={`/insights/${relatedPost.slug}`}>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(relatedPost.publishedAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/insights">
                  <Button variant="outline" data-testid="button-view-all-insights">
                    View All Insights
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
