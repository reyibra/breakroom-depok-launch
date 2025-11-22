import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Reviews = lazy(() => import("./pages/admin/Reviews"));
const News = lazy(() => import("./pages/admin/News"));
const Promos = lazy(() => import("./pages/admin/Promos"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Optimized React Query configuration for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data considered fresh for 5 minutes (reduces unnecessary refetches)
      staleTime: 5 * 60 * 1000,
      // Cache data for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 1 time (instead of default 3)
      retry: 1,
      // Don't refetch on window focus in production (can be overwhelming)
      refetchOnWindowFocus: false,
      // Refetch on reconnect (important for offline users)
      refetchOnReconnect: true,
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary fallbackMessage="We're experiencing technical difficulties. Our team has been notified and is working on a fix.">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <ErrorBoundary fallbackMessage="This page encountered an error. Try going back or reloading.">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="news" element={<News />} />
                  <Route path="promos" element={<Promos />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
