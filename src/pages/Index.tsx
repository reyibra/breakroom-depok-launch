import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-breakroom.jpg";
import roomClassic from "@/assets/room-classic.jpg";
import roomPremium from "@/assets/room-premium.jpg";

const Index = () => {
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

  const rooms = [
    {
      name: "Classic Room",
      price: "Rp 150.000",
      duration: "30 menit",
      image: roomClassic,
      description: "Ruangan standar dengan berbagai item untuk dihancurkan",
    },
    {
      name: "Premium Room",
      price: "Rp 250.000",
      duration: "45 menit",
      image: roomPremium,
      description: "Ruangan premium dengan lebih banyak pilihan item dan durasi lebih lama",
    },
  ];

  const testimonials = [
    {
      name: "Rizky A.",
      role: "Pekerja Kantoran",
      text: "Setelah seminggu kerja yang melelahkan, tempat ini adalah pelarian yang sempurna. Rasanya lega banget!",
    },
    {
      name: "Sarah M.",
      role: "Mahasiswa",
      text: "Pengalaman yang unik dan menyenangkan! Staff sangat membantu dan safety-nya terjaga dengan baik.",
    },
    {
      name: "Dimas P.",
      role: "Entrepreneur",
      text: "Cara yang efektif untuk melepas stress. Pasti akan kembali lagi!",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-caution/20 border border-caution rounded">
              <span className="text-caution font-bold uppercase tracking-wider text-sm">
                Stress-Release Room Indonesia
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Luapkan,</span>{" "}
              <span className="text-gradient">Lepaskan</span>{" "}
              & <span className="text-gradient">Lupakan</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground">
              Penatmu di Breakroom Depok
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tempat aman untuk melepaskan stress dengan cara yang berbeda. Hancurkan, teriak, dan rasakan kebebasan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/booking">Booking Sekarang</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/rooms">Lihat Ruangan</Link>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Kenapa Pilih <span className="text-gradient">Breakroom?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms Preview */}
        <section className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Pilihan <span className="text-gradient">Ruangan</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Pilih ruangan yang sesuai dengan kebutuhan dan budget Anda
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rooms.map((room, index) => (
                <Card key={index} className="overflow-hidden border-border hover:border-primary transition-colors">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
                    <p className="text-muted-foreground mb-4">{room.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">{room.price}</div>
                        <div className="text-sm text-muted-foreground">{room.duration}</div>
                      </div>
                      <Button variant="default" asChild>
                        <Link to="/rooms">Detail</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="hero" size="lg" asChild>
                <Link to="/rooms">Lihat Semua Ruangan</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Apa Kata <span className="text-gradient">Mereka?</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Pengalaman nyata dari pelanggan yang sudah merasakan Breakroom
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Melepaskan Stress Anda?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Booking sekarang dan rasakan pengalaman pelepasan stress yang berbeda
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

export default Index;
