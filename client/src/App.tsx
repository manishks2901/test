import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { Scale } from "lucide-react";

import Landing from "@/pages/Landing";
import PracticeAreaDetail from "@/pages/PracticeAreaDetail";
import InsightDetail from "@/pages/InsightDetail";

import Dashboard from "@/pages/admin/Dashboard";
import Posts from "@/pages/admin/Posts";
import PostEditor from "@/pages/admin/PostEditor";
import Categories from "@/pages/admin/Categories";
import Messages from "@/pages/admin/Messages";
import TeamAdmin from "@/pages/admin/TeamAdmin";
import Analytics from "@/pages/admin/Analytics";
import Subscribers from "@/pages/admin/Subscribers";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Scale className="h-12 w-12 text-gold animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = "/api/login";
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Landing />} />
      <Route path="/services" component={() => <Landing />} />
      <Route path="/services/:slug" component={() => <PracticeAreaDetail />} />
      <Route path="/team" component={() => <Landing />} />
      <Route path="/insights" component={() => <Landing />} />
      <Route path="/insights/:slug" component={() => <InsightDetail />} />
      <Route path="/contact" component={() => <Landing />} />
      
      <Route path="/admin">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/admin/posts">
        {() => <ProtectedRoute component={Posts} />}
      </Route>
      <Route path="/admin/posts/new">
        {() => <ProtectedRoute component={PostEditor} />}
      </Route>
      <Route path="/admin/posts/:id">
        {() => <ProtectedRoute component={PostEditor} />}
      </Route>
      <Route path="/admin/categories">
        {() => <ProtectedRoute component={Categories} />}
      </Route>
      <Route path="/admin/messages">
        {() => <ProtectedRoute component={Messages} />}
      </Route>
      <Route path="/admin/team">
        {() => <ProtectedRoute component={TeamAdmin} />}
      </Route>
      <Route path="/admin/analytics">
        {() => <ProtectedRoute component={Analytics} />}
      </Route>
      <Route path="/admin/subscribers">
        {() => <ProtectedRoute component={Subscribers} />}
      </Route>
      
      <Route component={() => <Landing />} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="wadhwa-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
