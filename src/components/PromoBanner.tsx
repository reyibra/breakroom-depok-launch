import { X, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-caution via-primary to-caution overflow-hidden">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent animate-pulse"></div>
      
      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-background animate-pulse flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="font-bold text-background text-sm md:text-base lg:text-lg whitespace-nowrap">
                  🎉 PROMO SPESIAL!
                </span>
                <span className="text-background/90 text-xs md:text-sm lg:text-base">
                  Diskon 20% untuk booking pertama kamu! Gunakan kode: <span className="font-bold">BREAK20</span>
                </span>
              </div>
            </div>

            <Button 
              size="sm"
              variant="outline"
              className="hidden sm:flex bg-background text-primary hover:bg-background/90 border-background font-semibold whitespace-nowrap flex-shrink-0"
              asChild
            >
              <a href="https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20booking%20dengan%20kode%20BREAK20" target="_blank" rel="noopener noreferrer">
                <Zap className="w-4 h-4 mr-2" />
                Booking Sekarang
              </a>
            </Button>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-background hover:text-background/70 transition-colors p-1 flex-shrink-0"
            aria-label="Tutup banner"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Mobile CTA Button */}
        <div className="sm:hidden mt-2">
          <Button 
            size="sm"
            variant="outline"
            className="w-full bg-background text-primary hover:bg-background/90 border-background font-semibold"
            asChild
          >
            <a href="https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20booking%20dengan%20kode%20BREAK20" target="_blank" rel="noopener noreferrer">
              <Zap className="w-4 h-4 mr-2" />
              Booking Sekarang
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-background/40 to-transparent"></div>
    </div>
  );
};

export default PromoBanner;