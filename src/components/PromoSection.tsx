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
    <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-[1.02]">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-caution/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Discount badge */}
      {promo.discount_percentage && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-br from-caution via-primary to-caution p-3 rounded-full shadow-lg animate-pulse">
            <div className="text-center">
              <div className="text-2xl font-black text-background leading-none">
                {promo.discount_percentage}%
              </div>
              <div className="text-[8px] font-bold text-background/90 uppercase">
                OFF
              </div>
            </div>
          </div>
        </div>
      )}

      <CardContent className="p-6 relative">
        {/* Image */}
        {promo.image_url && (
          <div className="mb-4 rounded-xl overflow-hidden shadow-md">
            <img 
              src={promo.image_url} 
              alt={promo.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        {/* Title with icon */}
        <div className="flex items-start gap-2 mb-3">
          <Tag className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {promo.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {promo.description}
        </p>

        {/* Countdown timer */}
        {showCountdown && timeLeft && (
          <div className="mb-4 p-3 bg-gradient-to-r from-caution/10 via-primary/10 to-caution/10 rounded-lg border border-caution/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-caution animate-pulse" />
              <span className="text-xs font-semibold text-caution uppercase tracking-wider">
                Promo Berakhir Dalam
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: timeLeft.days, label: 'Hari' },
                { value: timeLeft.hours, label: 'Jam' },
                { value: timeLeft.minutes, label: 'Menit' },
                { value: timeLeft.seconds, label: 'Detik' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-background/50 backdrop-blur-sm rounded-md p-2 border border-border">
                    <div className="text-lg font-black text-primary">
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

        {/* Validity period */}
        {!showCountdown && (
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              Berlaku s/d {new Date(promo.end_date).toLocaleDateString('id-ID', {
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
          className="w-full group/btn relative overflow-hidden"
          asChild
        >
          <a 
            href={`https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20booking%20dengan%20promo%20${encodeURIComponent(promo.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Gunakan Promo Ini
            <Sparkles className="ml-2 h-4 w-4 group-hover/btn:animate-pulse" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export const PromoSection = () => {
  const { data: promos, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="h-8 bg-muted animate-pulse rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-muted animate-pulse rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg"></div>
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
    <section id="promo" className="py-12 md:py-20 px-4 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-primary/10 to-caution/10 rounded-full border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <Badge variant="outline" className="text-sm font-bold">
              Promo Spesial
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">Penawaran</span> Terbaik Untuk Anda
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk mendapatkan pengalaman stress-release dengan harga spesial
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
