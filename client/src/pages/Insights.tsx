import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import { Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { Post, Category } from "@shared/schema";

type PostWithAuthor = Post & {
  author?: { firstName: string | null; lastName: string | null } | null;
  category?: Category | null;
};

export default function Insights() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: posts, isLoading: postsLoading } = useQuery<PostWithAuthor[]>({
    queryKey: ["/api/posts", { published: true }],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.categoryId?.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                Insights & Articles
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Legal Insights
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Stay informed with our latest legal updates, thought leadership 
                articles, and expert commentary on developments in the law.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background z-40">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-insights"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[200px]" data-testid="select-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            {postsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group border border-border/50 overflow-visible hover-elevate"
                    data-testid={`card-post-${post.id}`}
                  >
                    <CardContent className="p-0">
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/30" />
                      </div>
                      <div className="p-6">
                        {post.category && (
                          <Badge
                            variant="secondary"
                            className="bg-gold/10 text-gold border-gold/20 mb-4"
                          >
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
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getAuthorInitials(post)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              {getAuthorName(post)}
                            </span>
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Check back soon for our latest insights and legal updates."}
                </p>
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Have a Legal Question?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Our team is ready to provide expert guidance on your legal matters.
            </p>
            <Link href="/contact">
              <Button size="lg" data-testid="button-insights-contact">
                Contact Us
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
