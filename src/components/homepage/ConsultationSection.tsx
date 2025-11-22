import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Video } from "lucide-react";

export const ConsultationSection = () => {
  return (
    <section id="consultation" className="py-12 md:py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3">
          <h3 className="text-lg md:text-xl font-semibold text-primary">
            Professional Support
          </h3>
          <h2 className="text-2xl md:text-4xl font-bold text-gradient">
            Psychology Consultation Services
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Card className="bg-background border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
            <CardHeader className="text-center pb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Video className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <CardTitle className="text-xl md:text-2xl">Online Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5">
              <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed">
                Konsultasi psikologi online dengan profesional bersertifikat. Fleksibel dan nyaman dari mana saja.
              </p>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Video call dengan psikolog profesional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Privasi dan kerahasiaan terjamin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Jadwal fleksibel sesuai kebutuhan</span>
                </li>
              </ul>
              <Button className="w-full" variant="hero" asChild>
                <a
                  href="https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20konsultasi%20psikologi%20online"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Book Online Session
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
            <CardHeader className="text-center pb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <CardTitle className="text-xl md:text-2xl">Offline Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5">
              <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed">
                Konsultasi tatap muka langsung di lokasi Breakroom Depok untuk pengalaman lebih personal.
              </p>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Sesi tatap muka dengan psikolog</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Ruangan konsultasi yang nyaman</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Bisa digabung dengan sesi Breakroom</span>
                </li>
              </ul>
              <Button className="w-full" variant="hero" asChild>
                <a
                  href="https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20konsultasi%20psikologi%20offline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Book Offline Session
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
