import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Newspaper, X } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface News {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
  is_active: boolean;
  created_at: string;
}

export const NewsSection = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(3);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch current limit + 1 to check if there's more
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("is_active", true)
          .order("published_at", { ascending: false })
          .limit(currentLimit + 1);

        if (error) throw error;
        
        // If we got more than currentLimit, there's more to load
        setHasMore((data?.length || 0) > currentLimit);
        
        // Only show currentLimit items
        setNews(data?.slice(0, currentLimit) || []);
        console.log("📰 News updated:", data?.length || 0, "active news");
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchNews();

    // Subscribe to real-time updates for news changes
    const channel = supabase
      .channel("news-realtime-updates")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to INSERT, UPDATE, DELETE
          schema: "public",
          table: "news",
        },
        (payload) => {
          console.log("📡 Real-time news change detected:", payload.eventType);
          fetchNews(); // Refetch news when any change occurs
        }
      )
      .subscribe((status) => {
        console.log("📡 News real-time subscription status:", status);
      });

    return () => {
      console.log("📡 Unsubscribing from news updates");
      supabase.removeChannel(channel);
    };
  }, [currentLimit]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setCurrentLimit(prev => prev + 3);
  };

  if (loading) {
    return (
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12 px-2 animate-fade-in">
            <div className="h-10 bg-muted/50 rounded-lg w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 bg-muted/50 rounded-lg w-80 mx-auto mb-3 animate-pulse"></div>
            <div className="h-6 bg-muted/30 rounded-lg w-96 max-w-full mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-44 md:h-48 bg-muted/40 animate-pulse"></div>
                <div className="p-5 md:p-6 space-y-3">
                  <div className="h-4 bg-muted/30 rounded w-32 animate-pulse"></div>
                  <div className="h-6 bg-muted/40 rounded w-5/6 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/20 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-muted/20 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in px-2">
          <div className="inline-flex items-center gap-2 mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 rounded-full">
            <Newspaper className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-xs md:text-sm">
              {t('news.badge')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            <span className="text-gradient">{t('news.title')}</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('news.subtitle')}
          </p>
        </div>

        {/* News Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {news.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 bg-card border-border animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                setSelectedNews(item);
                setDialogOpen(true);
              }}
            >
              {/* Image */}
              {item.image_url && (
                <div className="relative h-44 md:h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              )}

              <CardContent className="p-5 md:p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span>
                    {format(new Date(item.published_at), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Content Preview */}
                <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
                
                {/* Read More Indicator */}
                <p className="text-xs md:text-sm text-primary font-semibold mt-3 group-hover:underline">
                  {t('news.readMore')} →
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8 md:mt-12 animate-fade-in">
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              size="lg"
              variant="outline"
              className="min-w-[200px]"
            >
              {loadingMore ? t('common.loading') : "Muat Lebih Banyak"}
            </Button>
          </div>
        )}

        {/* Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold pr-8">
                {selectedNews?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedNews && (
              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {t('news.published')} {format(new Date(selectedNews.published_at), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </span>
                </div>

                {/* Full Image */}
                {selectedNews.image_url && (
                  <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                    <img
                      src={selectedNews.image_url}
                      alt={selectedNews.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Full Content */}
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedNews.content}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
