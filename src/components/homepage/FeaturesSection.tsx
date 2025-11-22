import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Pelepasan Energi",
    description: "Lepaskan stress dengan cara yang aman dan terkontrol",
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description: "Perlengkapan safety lengkap dan prosedur keamanan ketat",
  },
  {
    icon: Clock,
    title: "Fleksibel",
    description: "Pilih durasi sesi sesuai kebutuhan Anda",
  },
  {
    icon: Users,
    title: "Private & Group",
    description: "Tersedia untuk individu maupun kelompok",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gradient">
          Why Choose Breakroom?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-card hover:bg-card/80 border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant"
              >
                <CardContent className="p-5 md:p-6 text-center space-y-3 md:space-y-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
