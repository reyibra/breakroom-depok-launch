import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Percent } from "lucide-react";

interface Promo {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  discount_percentage: number | null;
  start_date: string;
  end_date: string;
}

const PromoSection = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      const { data, error } = await supabase
        .from("promos")
        .select("*")
        .eq("is_active", true)
        .lte("start_date", new Date().toISOString())
        .gte("end_date", new Date().toISOString())
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPromos(data);
      }
      setLoading(false);
    };

    fetchPromos();
  }, []);

  if (loading || promos.length === 0) return null;

  return (
    <section id="promo" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Promo Spesial
          </h2>
          <p className="text-muted-foreground text-lg">
            Dapatkan penawaran terbaik dari kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <Card
              key={promo.id}
              className="overflow-hidden hover-scale group border-border/50 bg-card/80 backdrop-blur-sm shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {promo.image_url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={promo.image_url}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {promo.title}
                  </h3>
                  {promo.discount_percentage && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Percent className="h-3 w-3" />
                      {promo.discount_percentage}%
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {promo.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Berlaku hingga{" "}
                    {new Date(promo.end_date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
