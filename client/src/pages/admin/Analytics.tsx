import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { 
  Eye, 
  TrendingUp, 
  Calendar, 
  Clock,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface AnalyticsSummary {
  totalViews: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  topPosts: { postId: number; title: string; views: number }[];
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  isLoading 
}: { 
  title: string; 
  value: number | string; 
  icon: React.ElementType;
  description?: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid={`stat-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Analytics() {
  const { data: analytics, isLoading } = useQuery<AnalyticsSummary>({
    queryKey: ["/api/analytics"],
  });

  const chartData = analytics?.topPosts.map((post) => ({
    name: post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title,
    views: post.views,
    fullTitle: post.title,
  })) || [];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground" data-testid="text-analytics-title">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track blog post performance and engagement metrics
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Views"
            value={analytics?.totalViews || 0}
            icon={Eye}
            description="All-time page views"
            isLoading={isLoading}
          />
          <StatCard
            title="Today"
            value={analytics?.viewsToday || 0}
            icon={Clock}
            description="Views in last 24 hours"
            isLoading={isLoading}
          />
          <StatCard
            title="This Week"
            value={analytics?.viewsThisWeek || 0}
            icon={Calendar}
            description="Views in last 7 days"
            isLoading={isLoading}
          />
          <StatCard
            title="This Month"
            value={analytics?.viewsThisMonth || 0}
            icon={TrendingUp}
            description="Views in last 30 days"
            isLoading={isLoading}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gold" />
                Top Performing Posts
              </CardTitle>
              <CardDescription>
                Most viewed articles in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 flex-1" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              ) : analytics?.topPosts && analytics.topPosts.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={120}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value) => [value, "Views"]}
                        labelFormatter={(label) => label}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Bar 
                        dataKey="views" 
                        fill="hsl(var(--gold))" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mb-4 opacity-50" />
                  <p>No view data available yet</p>
                  <p className="text-sm">Views will appear once visitors read your posts</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-gold" />
                Post Performance Breakdown
              </CardTitle>
              <CardDescription>
                Detailed view counts per article
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-border/50 rounded-md">
                      <Skeleton className="h-4 flex-1 mr-4" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              ) : analytics?.topPosts && analytics.topPosts.length > 0 ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {analytics.topPosts.map((post, index) => (
                    <div 
                      key={post.postId}
                      className="flex items-center justify-between p-3 border border-border/50 rounded-md hover-elevate"
                      data-testid={`post-stat-${post.postId}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-sm truncate" title={post.title}>
                          {post.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        {post.views.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                  <Eye className="h-12 w-12 mb-4 opacity-50" />
                  <p>No posts have been viewed yet</p>
                  <p className="text-sm">Share your content to start tracking</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
