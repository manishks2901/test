import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import {
  FileText,
  MessageSquare,
  Users,
  FolderOpen,
  Plus,
  ArrowRight,
} from "lucide-react";
import type { Post, ContactSubmission, Category, TeamMember } from "@shared/schema";

export default function Dashboard() {
  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: team, isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const stats = [
    {
      title: "Total Posts",
      value: posts?.length || 0,
      icon: FileText,
      href: "/admin/posts",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Contact Messages",
      value: messages?.filter((m) => !m.isRead).length || 0,
      subtext: "unread",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Categories",
      value: categories?.length || 0,
      icon: FolderOpen,
      href: "/admin/categories",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Team Members",
      value: team?.length || 0,
      icon: Users,
      href: "/admin/team",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const recentPosts = posts?.slice(0, 5) || [];
  const recentMessages = messages?.slice(0, 5) || [];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome to the Wadhwa & Co. admin panel
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="hover-elevate cursor-pointer" data-testid={`card-stat-${stat.title.toLowerCase().replace(/\s/g, '-')}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      {postsLoading || messagesLoading || categoriesLoading || teamLoading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        <p className="text-3xl font-bold text-foreground">
                          {stat.value}
                          {stat.subtext && (
                            <span className="text-sm font-normal text-muted-foreground ml-1">
                              {stat.subtext}
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="font-serif text-xl">Recent Posts</CardTitle>
              <Link href="/admin/posts/new">
                <Button size="sm" data-testid="button-new-post-dashboard">
                  <Plus className="h-4 w-4 mr-1" />
                  New Post
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {postsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : recentPosts.length > 0 ? (
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <Link key={post.id} href={`/admin/posts/${post.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {post.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {post.published ? "Published" : "Draft"}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No posts yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="font-serif text-xl">Recent Messages</CardTitle>
              <Link href="/admin/messages">
                <Button variant="outline" size="sm" data-testid="button-view-messages">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {messagesLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : recentMessages.length > 0 ? (
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <Link key={message.id} href={`/admin/messages/${message.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground truncate">
                              {message.name}
                            </p>
                            {!message.isRead && (
                              <span className="w-2 h-2 rounded-full bg-gold" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {message.subject}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No messages yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
