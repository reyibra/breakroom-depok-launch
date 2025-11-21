import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Newspaper } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("is_active", true)
          .order("published_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setNews(data || []);
        console.log("📰 News updated:", data?.length || 0, "active news");
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
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
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-24 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
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
    <section className="py-12 md:py-24 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Newspaper className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Info Terkini
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Berita Terbaru</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Update dan informasi terbaru dari Breakroom Depok
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              {item.image_url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              )}

              <CardContent className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(item.published_at), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Content */}
                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
