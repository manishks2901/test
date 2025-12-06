import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import type { Post, Category } from "@shared/schema";
import { SEO } from "@/components/SEO";
import { AnimatedReveal } from "@/components/AnimatedReveal";

type PostWithAuthor = Post & {
  author?: { firstName: string | null; lastName: string | null } | null;
  category?: Category | null;
};

export default function Insights() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: posts, isLoading: postsLoading } = useQuery<PostWithAuthor[]>({
    queryKey: ["/api/posts?published=true"],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const itemsPerPage = 3;
  const visiblePosts = posts || [];
  const totalPages = Math.ceil(visiblePosts.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage);
  const paginatedPosts = visiblePosts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage >= 0 ? prev - itemsPerPage : Math.max(0, visiblePosts.length - itemsPerPage)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage < visiblePosts.length ? prev + itemsPerPage : 0));
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAuthorInitials = (post: PostWithAuthor) => {
    if (post.author?.firstName && post.author?.lastName) {
      return `${post.author.firstName[0]}${post.author.lastName[0]}`;
    }
    return "WC";
  };

  const getAuthorName = (post: PostWithAuthor) => {
    if (post.author?.firstName || post.author?.lastName) {
      return `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim();
    }
    return "Wadhwa & Co.";
  };

  return (
    <section className="py-16 md:py-24" id="insights">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl mb-10">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Insights & Articles
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Legal Insights
          </h2>
          <p className="text-muted-foreground">
            Stay informed with our latest legal updates, thought leadership, and commentary across key practice areas.
          </p>
        </div>

        {postsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border border-border/50">
                <CardContent className="p-0">
                  <Skeleton className="h-48 rounded-t-md" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : paginatedPosts && paginatedPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedPosts.map((post, idx) => (
                <AnimatedReveal key={post.id} delay={idx * 0.05}>
                  <Card
                    className="group border border-border/50 overflow-visible hover-elevate"
                    data-testid={`card-post-${post.id}`}
                  >
                    <CardContent className="p-0">
                      <Link href={`/insights/${post.slug}`}>
                        {post.featuredImage ? (
                          <div className="h-48 overflow-hidden rounded-t-lg">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              data-testid={`img-post-featured-${post.id}`}
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center rounded-t-lg">
                            <BookOpen className="h-12 w-12 text-primary/30" />
                          </div>
                        )}
                      </Link>
                      <div className="p-6">
                        {post.category && (
                          <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20 mb-4">
                            {post.category.name}
                          </Badge>
                        )}
                        <Link href={`/insights/${post.slug}`}>
                          <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        {post.excerpt && (
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getAuthorInitials(post)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{getAuthorName(post)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readingTime} min
                            </span>
                          </div>
                        </div>
                        <Link href={`/insights/${post.slug}`}>
                          <Button
                            variant="ghost"
                            className="p-0 h-auto text-gold hover:text-gold/80 font-medium w-full justify-start"
                            data-testid={`link-insight-${post.id}`}
                          >
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedReveal>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  data-testid="button-carousel-prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  data-testid="button-carousel-next"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for our latest insights and legal updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
