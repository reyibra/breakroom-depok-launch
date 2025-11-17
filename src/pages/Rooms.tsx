import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import roomClassic from "@/assets/room-classic.jpg";
import roomPremium from "@/assets/room-premium.jpg";
import safetyGear from "@/assets/safety-gear.jpg";

const Rooms = () => {
  const rooms = [
    {
      id: "classic",
      name: "Classic Room",
      price: "Rp 150.000",
      duration: "30 menit",
      capacity: "1 orang",
      image: roomClassic,
      description: "Pilihan sempurna untuk mencoba pengalaman stress-release pertama kali",
      features: [
        "Berbagai item untuk dihancurkan (piring, gelas, botol)",
        "Perlengkapan safety lengkap",
        "Background music sesuai pilihan",
        "Staff pendamping",
        "Dokumentasi foto",
      ],
      badge: "Populer",
    },
    {
      id: "premium",
      name: "Premium Room",
      price: "Rp 250.000",
      duration: "45 menit",
      capacity: "1-2 orang",
      image: roomPremium,
      description: "Pengalaman maksimal dengan durasi lebih lama dan pilihan item lebih banyak",
      features: [
        "Semua benefit Classic Room",
        "Lebih banyak item untuk dihancurkan",
        "Elektronik bekas (TV, komputer, printer)",
        "Durasi lebih lama (45 menit)",
        "Dokumentasi video",
        "Minuman gratis setelah sesi",
      ],
      badge: "Best Value",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground">Pilih Ruangan Anda</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Temukan <span className="text-gradient">Ruangan</span> yang Tepat
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Setiap ruangan dirancang untuk memberikan pengalaman pelepasan stress yang aman dan memuaskan
            </p>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden border-2 border-border hover:border-primary transition-colors">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    {room.badge && (
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                        {room.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-3xl">{room.name}</CardTitle>
                    <p className="text-muted-foreground">{room.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">{room.price}</span>
                      <span className="text-muted-foreground">/ {room.duration}</span>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <Badge variant="outline">⏱️ {room.duration}</Badge>
                      <Badge variant="outline">👥 {room.capacity}</Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm uppercase tracking-wider">Termasuk:</h4>
                      {room.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button variant="hero" className="w-full" size="lg" asChild>
                      <Link to="/booking">Booking {room.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Equipment */}
        <section className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-caution text-caution-foreground">Keamanan Utama</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perlengkapan Safety <span className="text-gradient">Berkualitas</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Keamanan adalah prioritas utama kami. Setiap sesi dilengkapi dengan perlengkapan safety standar industri:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Coverall safety orange full body</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Helm pelindung kepala</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Sarung tangan safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Sepatu safety (jika diperlukan)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Staff terlatih siap membantu</span>
                  </li>
                </ul>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Pelajari Lebih Lanjut</Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={safetyGear} 
                  alt="Safety Equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sudah Pilih Ruangan?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Booking sekarang dan amankan slot Anda. Jumlah slot terbatas setiap harinya!
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/booking">Booking Sekarang</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Rooms;
