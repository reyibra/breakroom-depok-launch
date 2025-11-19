import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Clock, Users, Heart, AlertTriangle, MessageCircle, MapPin, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReviewsSection } from "@/components/ReviewsSection";
import heroImage from "@/assets/hero-breakroom.jpg";
import safetyGear from "@/assets/safety-gear.jpg";

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

  const consultationServices = [
    {
      icon: Users,
      title: "Konsultasi Psikologi",
      description: "Kami menyediakan layanan konsultasi psikologi profesional"
    },
    {
      icon: MapPin,
      title: "Online & Offline",
      description: "Tersedia sesi konsultasi secara online maupun tatap muka"
    },
    {
      icon: MessageCircle,
      title: "Hubungi Kami",
      description: "Untuk info lebih lanjut, hubungi kami via WhatsApp"
    }
  ];

  const safetyRules = [
    {
      icon: Shield,
      title: "Wajib Menggunakan APD",
      description: "Semua peserta wajib menggunakan alat pelindung diri (coverall, helm, sarung tangan) selama sesi berlangsung."
    },
    {
      icon: AlertTriangle,
      title: "Ikuti Instruksi Staff",
      description: "Dengarkan dan ikuti semua instruksi dari staff kami untuk keamanan maksimal."
    },
    {
      icon: Users,
      title: "Persyaratan Usia",
      description: "Peserta minimal berusia 17 tahun ke atas."
    },
    {
      icon: Heart,
      title: "Persyaratan Kesehatan",
      description: "Tidak diperbolehkan untuk ibu hamil. Harap konfirmasi jika memiliki kondisi kesehatan khusus."
    },
  ];

  const procedures = [
    {
      step: "1",
      title: "Check-in & Briefing",
      description: "Tiba 10 menit sebelum sesi. Staff akan memberikan penjelasan safety dan prosedur."
    },
    {
      step: "2",
      title: "Pemakaian APD",
      description: "Kenakan coverall safety, helm, dan sarung tangan yang telah disediakan."
    },
    {
      step: "3",
      title: "Masuk Ruangan",
      description: "Staff akan mengantar Anda ke ruangan dan memastikan semua peralatan siap."
    },
    {
      step: "4",
      title: "Sesi Dimulai",
      description: "Luapkan emosi Anda! Hancurkan item yang tersedia sesuai waktu yang dipilih."
    },
    {
      step: "5",
      title: "Selesai & Clean Up",
      description: "Staff akan membersihkan ruangan. Anda bisa beristirahat dan minum di area lounge."
    },
  ];

  const faqs = [
    {
      q: "Apakah aman?",
      a: "Sangat aman! Kami menggunakan perlengkapan safety standar industri dan staff terlatih siap membantu."
    },
    {
      q: "Apa yang boleh dihancurkan?",
      a: "Item yang disediakan meliputi piring, gelas, botol, dan untuk paket premium ada elektronik bekas (TV, printer, keyboard)."
    },
    {
      q: "Boleh bawa item sendiri?",
      a: "Mohon konfirmasi terlebih dahulu dengan tim kami. Beberapa item mungkin tidak diperbolehkan karena alasan keamanan."
    },
    {
      q: "Bagaimana jika terlambat?",
      a: "Jika terlambat lebih dari 15 menit, waktu sesi akan dikurangi sesuai keterlambatan."
    },
    {
      q: "Bisakah reschedule?",
      a: "Ya, reschedule bisa dilakukan maksimal H-1 dari jadwal booking."
    },
    {
      q: "Apa yang harus dibawa?",
      a: "Cukup bawa diri Anda! Semua perlengkapan sudah kami sediakan. Disarankan pakai pakaian nyaman."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-[80vh] flex items-center pt-16">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl space-y-3 md:space-y-4">
              <Badge variant="secondary" className="text-xs">
                #1 Stress Release Room di Indonesia
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Luapkan, Lepaskan & Lupakan Penatmu
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Rasakan pengalaman unik melepaskan stress dengan menghancurkan berbagai item dalam ruangan yang aman dan terkontrol.
              </p>
              <p className="text-lg md:text-xl font-semibold text-primary">
                Mulai dari Rp 65.000
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2">
                <Button size="lg" variant="hero" className="text-sm" asChild>
                  <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer">
                    Booking Sekarang
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Aman & Terkontrol</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>APD Lengkap</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 md:py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Kenapa Memilih Breakroom?
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Pengalaman stress-release yang aman, menyenangkan, dan efektif
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Services Section */}
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Kami Menyediakan Konsultasi Psikologi
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Layanan konsultasi psikologi tersedia secara online dan offline
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto mb-4">
              {consultationServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">{service.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" variant="hero" className="text-sm" asChild>
                <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer">
                  Hubungi Kami untuk Info Lebih Lanjut
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-8 md:py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Keamanan Terjamin
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Keselamatan Anda adalah prioritas utama kami
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {safetyRules.map((rule, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <rule.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold mb-0.5">{rule.title}</h3>
                            <p className="text-xs text-muted-foreground">{rule.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src={safetyGear} 
                  alt="Safety Equipment"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Procedures Section */}
        <section id="about" className="py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Prosedur Kunjungan
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Langkah-langkah yang akan Anda lalui
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-2 md:space-y-3">
              {procedures.map((procedure, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-base font-bold text-primary-foreground">{procedure.step}</span>
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-semibold mb-0.5">{procedure.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{procedure.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <section className="py-8 md:py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Pertanyaan Umum
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Jawaban untuk pertanyaan yang sering diajukan
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-2 md:space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-semibold mb-1">{faq.q}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Siap Melepaskan Stress?
                </h2>
                <p className="text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
                  Booking sekarang dan rasakan pengalaman stress-release yang tidak akan Anda lupakan!
                </p>
                <Button size="lg" variant="hero" className="text-sm" asChild>
                  <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer">
                    Booking Sekarang
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
