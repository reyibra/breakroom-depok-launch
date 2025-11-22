import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Clock, MessageCircle } from "lucide-react";
import { useEffect } from "react";

const PromoCard = ({ promo }: { promo: any }) => {
  return (
    <Card className="border-border">
      <CardContent className="p-4 md:p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-foreground">
          {promo.title}
        </h3>

        {/* Promo Code */}
        {promo.promo_code && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
            <Tag className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono font-bold text-primary tracking-wide text-sm">
              {promo.promo_code}
            </span>
            {promo.discount_percentage && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {promo.discount_percentage}% OFF
              </Badge>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
          {promo.description}
        </p>

        {/* Static End Date */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-2 border-t border-border">
          <Clock className="w-3.5 h-3.5" />
          <span>
            Berlaku hingga {new Date(promo.end_date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>

        {/* CTA Button */}
        <Button 
          variant="default" 
          size="sm"
          className="w-full"
          asChild
        >
          <a 
            href={`https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20booking%20dengan%20promo%20${encodeURIComponent(promo.promo_code || promo.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-3.5 w-3.5" />
            Gunakan Promo
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export const PromoSection = () => {
  const { data: promos, isLoading, refetch } = useQuery({
    queryKey: ["active-promos"],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("promos")
        .select("*")
        .eq("is_active", true)
        .lte("start_date", now)
        .gte("end_date", now)
        .order("end_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  // Consolidated realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("promos-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "promos",
          filter: "is_active=eq.true",
        },
        () => refetch()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  if (isLoading) {
    return (
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 md:mb-8 space-y-2">
            <div className="h-8 bg-muted/50 rounded-lg w-32 md:w-40"></div>
            <div className="h-5 bg-muted/30 rounded-lg w-64 md:w-80 max-w-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 md:p-5 space-y-3">
                <div className="h-6 bg-muted/40 rounded w-3/4"></div>
                <div className="h-12 bg-muted/30 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted/20 rounded w-full"></div>
                  <div className="h-3 bg-muted/20 rounded w-5/6"></div>
                </div>
                <div className="h-8 bg-muted/40 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!promos || promos.length === 0) {
    return null;
  }

  return (
    <section id="promo" className="py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-1.5">
            Promo Aktif
          </h2>
          <p className="text-muted-foreground text-sm">
            Gunakan kode promo berikut untuk mendapatkan penawaran spesial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promos.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  );
};
