import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Clock, Sparkles, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PromoCard = ({ promo }: { promo: any }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const endDate = new Date(promo.end_date);
  const now = new Date();
  const daysUntilExpiry = differenceInDays(endDate, now);
  const showCountdown = daysUntilExpiry <= 7 && daysUntilExpiry >= 0;

  useEffect(() => {
    if (!showCountdown) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, showCountdown]);

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground">
          {promo.title}
        </h3>

        {/* Promo Code */}
        {promo.promo_code && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
            <Tag className="w-4 h-4 text-primary" />
            <span className="font-mono font-bold text-primary tracking-wide">
              {promo.promo_code}
            </span>
            {promo.discount_percentage && (
              <Badge variant="secondary" className="ml-2">
                {promo.discount_percentage}% OFF
              </Badge>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {promo.description}
        </p>

        {/* Countdown Timer */}
        {showCountdown && timeLeft && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-caution" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Berakhir dalam
              </span>
            </div>
            <div className="flex gap-2">
              {[
                { value: timeLeft.days, label: 'Hari' },
                { value: timeLeft.hours, label: 'Jam' },
                { value: timeLeft.minutes, label: 'Menit' },
                { value: timeLeft.seconds, label: 'Detik' },
              ].map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="bg-muted rounded p-2">
                    <div className="text-lg font-bold text-foreground">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Validity Date (when no countdown) */}
        {!showCountdown && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
            <Clock className="w-4 h-4" />
            <span>
              Berlaku hingga {new Date(promo.end_date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Button 
          variant="default" 
          className="w-full"
          asChild
        >
          <a 
            href={`https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20booking%20dengan%20promo%20${encodeURIComponent(promo.promo_code || promo.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
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
      console.log("🎁 Promos updated:", data?.length || 0, "active promos");
      return data;
    },
  });

  // Subscribe to real-time promo updates (only for active promos)
  useEffect(() => {
    const channel = supabase
      .channel("promos-realtime-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "promos",
          filter: "is_active=eq.true",
        },
        () => {
          console.log("📡 New active promo added");
          refetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "promos",
          filter: "is_active=eq.true",
        },
        () => {
          console.log("📡 Promo updated");
          refetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "promos",
        },
        (payload) => {
          console.log("📡 Promo deleted:", payload.old.id);
          refetch();
        }
      )
      .subscribe({
        next: (status) => {
          console.log("📡 Promos subscription:", status);
        },
        error: (error) => {
          console.error("❌ Promos subscription error:", error);
          refetch();
        }
      });

    return () => {
      console.log("📡 Unsubscribing from promos");
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 md:mb-12 space-y-3 animate-fade-in">
            <div className="h-10 bg-muted/50 rounded-lg w-48 animate-pulse"></div>
            <div className="h-6 bg-muted/30 rounded-lg w-96 max-w-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-8 bg-muted/40 rounded w-3/4 animate-pulse"></div>
                <div className="h-16 bg-muted/30 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted/20 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-muted/20 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-muted/20 rounded w-4/5 animate-pulse"></div>
                </div>
                <div className="h-10 bg-muted/40 rounded-lg animate-pulse"></div>
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
    <section id="promo" className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Promo Aktif
          </h2>
          <p className="text-muted-foreground">
            Gunakan kode promo berikut untuk mendapatkan penawaran spesial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  );
};
