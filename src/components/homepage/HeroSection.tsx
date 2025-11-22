import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Clock, MessageCircle, Tag, Info, Sparkles } from "lucide-react";
import { differenceInDays } from "date-fns";
import Autoplay from "embla-carousel-autoplay";
import heroImage from "@/assets/hero-breakroom-main.jpg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Promo {
  id: string;
  title: string;
  description: string;
  promo_code: string | null;
  discount_percentage: number | null;
  start_date: string;
  end_date: string;
}

interface HeroSectionProps {
  activePromos?: Promo[];
}

export const HeroSection = ({ activePromos }: HeroSectionProps) => {
  const [promoTimers, setPromoTimers] = useState<Record<string, TimeLeft>>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activePromos || activePromos.length === 0) return;

    const calculateAllTimers = () => {
      const newTimers: Record<string, TimeLeft> = {};
      
      activePromos.forEach((promo) => {
        const now = new Date();
        const endDate = new Date(promo.end_date);
        const daysUntilExpiry = differenceInDays(endDate, now);
        
        if (daysUntilExpiry <= 7 && daysUntilExpiry >= 0) {
          const difference = endDate.getTime() - now.getTime();
          
          if (difference > 0) {
            newTimers[promo.id] = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
          }
        }
      });
      
      setPromoTimers(newTimers);
    };

    calculateAllTimers();
    const timer = setInterval(calculateAllTimers, 1000);

    return () => clearInterval(timer);
  }, [activePromos]);

  return (
    <section id="hero" className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <img 
        src={heroImage}
        alt="Breakroom Depok Hero"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Promo Badge */}
        {activePromos && activePromos.length > 0 && (
          <div ref={carouselRef} className="w-full max-w-2xl mx-auto">
            <Carousel
              opts={{ 
                loop: true,
                skipSnaps: false,
              }}
              plugins={[
                Autoplay({ 
                  delay: 5000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                })
              ]}
              className="w-full"
            >
              <CarouselContent>
                {activePromos.map((promo) => {
                  const showCountdown = promoTimers[promo.id];
                  
                  return (
                    <CarouselItem key={promo.id}>
                      <div className="relative group">
                        <div className="bg-background/10 backdrop-blur-sm border-2 border-primary/40 rounded-full p-3 md:p-4">
                          {promo.discount_percentage && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-caution to-primary text-background text-xs md:text-sm font-black px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                              -{promo.discount_percentage}%
                            </div>
                          )}
                          
                          <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-4 space-y-2 md:space-y-0">
                            <div className="flex items-center justify-center gap-2">
                              <Tag className="w-4 h-4 text-primary" />
                              {promo.promo_code && (
                                <span className="text-sm md:text-lg font-black font-mono text-primary">
                                  {promo.promo_code}
                                </span>
                              )}
                            </div>
                            
                            {showCountdown && (
                              <div className="flex items-center justify-center gap-1 text-xs md:text-sm text-muted-foreground">
                                <Clock className="w-3 h-3 text-caution" />
                                <span>
                                  {showCountdown.days}d {showCountdown.hours}h tersisa
                                </span>
                              </div>
                            )}
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="text-xs md:text-sm text-primary hover:text-primary/80 font-semibold flex items-center gap-1 justify-center">
                                  <Info className="w-3 h-3" />
                                  Detail
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-bold text-primary">
                                    {promo.title}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {promo.discount_percentage && (
                                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                                      <p className="text-3xl font-black text-primary text-center">
                                        Diskon {promo.discount_percentage}%
                                      </p>
                                    </div>
                                  )}
                                  
                                  {promo.promo_code && (
                                    <div className="bg-accent/20 border border-dashed border-accent rounded-lg p-3">
                                      <p className="text-xs text-muted-foreground text-center mb-1">Kode Promo:</p>
                                      <p className="text-2xl font-black text-center font-mono tracking-wider text-foreground">
                                        {promo.promo_code}
                                      </p>
                                    </div>
                                  )}
                                  
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-sm text-muted-foreground">Deskripsi:</h4>
                                    <p className="text-foreground leading-relaxed">
                                      {promo.description}
                                    </p>
                                  </div>
                                  
                                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                                    <div>
                                      <p className="text-xs">Mulai:</p>
                                      <p className="font-semibold">{new Date(promo.start_date).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs">Berakhir:</p>
                                      <p className="font-semibold text-caution">{new Date(promo.end_date).toLocaleDateString('id-ID')}</p>
                                    </div>
                                  </div>
                                  
                                  <Button 
                                    className="w-full" 
                                    variant="hero"
                                    asChild
                                  >
                                    <a 
                                      href={`https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20booking${promo.promo_code ? ` dengan kode ${promo.promo_code}` : ` dengan promo ${promo.title}`}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <MessageCircle className="mr-2 h-4 w-4" />
                                      Booking dengan Promo Ini
                                    </a>
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              
              {activePromos.length > 1 && (
                <>
                  <CarouselPrevious className="h-8 w-8 bg-background/20 backdrop-blur-sm border border-primary/40" />
                  <CarouselNext className="h-8 w-8 bg-background/20 backdrop-blur-sm border border-primary/40" />
                </>
              )}
            </Carousel>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-6 leading-tight">
          <span className="text-gradient">Luapkan,</span>{" "}
          <span className="text-gradient">Lepaskan</span>{" "}
          & <span className="text-gradient">Lupakan</span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground leading-snug">
          Penatmu di Breakroom Depok
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed px-2">
          Tempat aman untuk melepaskan stress dengan cara yang berbeda. Hancurkan, teriak, dan rasakan kebebasan.
        </p>
        
        {/* Price Badge */}
        <div className="mb-6 md:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 backdrop-blur-sm border-2 border-primary/40 rounded-full px-4 py-2 md:px-6 md:py-3">
            <Tag className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                Mulai Dari
              </span>
              <span className="text-2xl md:text-3xl font-black text-primary leading-none">
                65K
              </span>
            </div>
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
          <Button size="lg" variant="hero" className="text-base md:text-lg px-6 py-5 md:px-8 md:py-6 shadow-glow" asChild>
            <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Book Now via WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" className="text-base md:text-lg px-6 py-5 md:px-8 md:py-6" asChild>
            <a href="#about">
              Learn More
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
