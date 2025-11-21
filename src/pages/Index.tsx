import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Clock, Users, Heart, AlertTriangle, FileCheck, Instagram, MessageCircle, MapPin, Check, Play, Sparkles, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ReviewsSection } from "@/components/ReviewsSection";
import { NewsSection } from "@/components/NewsSection";
import VideoPlayer from "@/components/VideoPlayer";
import heroImage from "@/assets/hero-breakroom-main.jpg";
import roomClassic from "@/assets/room-classic.jpg";
import roomPremium from "@/assets/room-premium.jpg";
import safetyGear from "@/assets/safety-gear.jpg";
import breakroomInterior from "@/assets/breakroom-interior.jpg";

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


  const roomDetails = [
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
      
      <main className="flex-grow">
        {/* Price Badge - Top Left - Responsive */}
        <div className="fixed top-16 left-2 md:top-20 md:left-4 z-50 animate-fade-in">
          <div className="relative group">
            {/* Main Badge */}
            <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 backdrop-blur-md p-2.5 md:p-4 rounded-xl md:rounded-2xl shadow-glow border border-primary/40 md:border-2 hover:scale-105 transition-smooth hover:shadow-[0_0_50px_hsl(24_100%_50%/0.5)]">
              <div className="flex flex-col items-start space-y-0.5 md:space-y-1">
                <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-primary-foreground/80 font-bold">
                  Mulai Dari
                </span>
                <div className="flex items-baseline gap-0.5 md:gap-1">
                  <span className="text-xl md:text-3xl font-black text-primary-foreground leading-none">
                    65K
                  </span>
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-caution animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-xl md:rounded-2xl blur-xl -z-10 animate-pulse"></div>
            
            {/* Decorative corner */}
            <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-4 h-4 md:w-6 md:h-6 bg-caution rounded-full flex items-center justify-center shadow-md">
              <Tag className="w-2 h-2 md:w-3 md:h-3 text-background" />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Promo Badge - Elegant and Integrated */}
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-caution/20 via-primary/20 to-caution/20 backdrop-blur-sm border border-caution/40 rounded-full shadow-glow animate-fade-in">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-caution animate-pulse" />
              <span className="text-caution font-bold text-xs md:text-sm uppercase tracking-wider">
                PROMO SPESIAL
              </span>
              <Tag className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-foreground font-semibold text-xs md:text-sm">
                Diskon 20% - Kode: <span className="text-primary">BREAK20</span>
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-gradient">Luapkan,</span>{" "}
              <span className="text-gradient">Lepaskan</span>{" "}
              & <span className="text-gradient">Lupakan</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground">
              Penatmu di Breakroom Depok
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
              Tempat aman untuk melepaskan stress dengan cara yang berbeda. Hancurkan, teriak, dan rasakan kebebasan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-sm md:text-base relative overflow-hidden group" asChild>
                <a href="https://wa.me/6282312504723?text=Halo!%20Saya%20ingin%20booking%20dengan%20kode%20BREAK20" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Booking Sekarang
                  <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full animate-pulse">
                    -20%
                  </span>
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-sm md:text-base" asChild>
                <a href="#konsultasi">Lihat Layanan</a>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* What is Breakroom Section */}
        <section id="tentang" className="relative py-12 md:py-20 px-4 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${breakroomInterior})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="max-w-3xl">
              <Badge className="mb-3 md:mb-4 bg-primary text-primary-foreground text-xs md:text-sm">Apa itu Breakroom?</Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Tempat <span className="text-gradient">Stress-Release</span> Pertama di Indonesia
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-foreground/90 mb-4 md:mb-6">
                Breakroom Depok adalah ruang pelepasan emosi yang aman dan terkontrol. Di sini, kamu bisa melampiaskan stress, frustrasi, atau emosi terpendam dengan cara yang berbeda—hancurkan barang dalam lingkungan yang dirancang khusus untuk itu.
              </p>
              <p className="text-lg text-foreground/80 mb-6">
                Bukan hanya tentang menghancurkan barang. Ini tentang memberikan diri kamu ruang untuk melepaskan tekanan hidup dengan cara yang aman, legal, dan bahkan menyenangkan.
              </p>
              <div className="space-y-3 bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Aman & Terkontrol</h4>
                    <p className="text-sm text-muted-foreground">Perlengkapan safety lengkap dan staff terlatih mendampingi setiap sesi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Fleksibel & Private</h4>
                    <p className="text-sm text-muted-foreground">Pilih durasi sesuai kebutuhan, tersedia untuk individu atau kelompok</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Pengalaman Unik</h4>
                    <p className="text-sm text-muted-foreground">Cara yang berbeda dan efektif untuk melepaskan stress setelah minggu yang melelahkan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery/Video Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
              <Badge className="mb-3 md:mb-4 bg-primary text-primary-foreground text-xs md:text-sm">Lihat Aksi</Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                <span className="text-gradient">Galeri Video</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Lihat pengalaman nyata pelanggan kami dan rasakan sensasinya
              </p>
            </div>
            
            {/* Video Gallery - 3 Videos Layout with Animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Horizontal Video - Constrained Width */}
              <div className="col-span-1 md:col-span-2 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                <VideoPlayer 
                  videoSrc="/videos/breakroom-horizontal.mp4"
                  aspectRatio="landscape"
                  title="Breakroom Experience"
                  autoplayOnView={true}
                />
              </div>
              
              {/* Vertical Video 1 */}
              <div className="col-span-1 flex justify-center animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                <div className="max-w-md w-full">
                  <VideoPlayer 
                    videoSrc="/videos/tiktok-vertical.mp4"
                    aspectRatio="portrait"
                    title="Stress Release Session"
                    autoplayOnView={true}
                  />
                </div>
              </div>
              
              {/* Vertical Video 2 */}
              <div className="col-span-1 flex justify-center animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
                <div className="max-w-md w-full">
                  <VideoPlayer 
                    videoSrc="/videos/tiktok-vertical-2.mp4"
                    aspectRatio="portrait"
                    title="Behind The Scenes"
                    autoplayOnView={true}
                  />
                </div>
              </div>
            </div>

            {/* Social Media CTA */}
            <div className="text-center mt-8 md:mt-12 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
              <p className="text-muted-foreground mb-4">Ikuti kami untuk konten lebih banyak</p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" size="lg" asChild className="group">
                  <a href="https://www.instagram.com/breakroom.depok/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="group">
                  <a href="https://www.tiktok.com/@breakroom.depok" target="_blank" rel="noopener noreferrer">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    TikTok
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <NewsSection />

        {/* Features Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
              Kenapa Pilih <span className="text-gradient">Breakroom?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary transition-colors">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Psychology Consultation Section */}
        <section id="konsultasi" className="py-12 md:py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-primary text-primary-foreground text-xs md:text-sm">Layanan Konsultasi</Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                Konsultasi <span className="text-gradient">Psikologi</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Kami menyediakan layanan konsultasi psikologi untuk membantu Anda mengatasi stress dan masalah emosional
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
              <Card className="overflow-hidden border-2 border-border hover:border-primary transition-colors">
                <CardContent className="p-6 md:p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">Konsultasi Online</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center mb-4">
                    Konsultasi dengan psikolog profesional dari mana saja melalui video call atau chat
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Fleksibel dan nyaman dari rumah</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Privasi terjamin</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Jadwal yang dapat disesuaikan</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-2 border-border hover:border-primary transition-colors">
                <CardContent className="p-6 md:p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">Konsultasi Offline</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center mb-4">
                    Bertemu langsung dengan psikolog di lokasi Breakroom Depok
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Interaksi tatap muka langsung</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Ruang konsultasi yang nyaman</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Suasana yang mendukung</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Card className="inline-block border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardContent className="p-6 md:p-8">
                  <p className="text-base md:text-lg font-semibold mb-4">
                    Untuk informasi lebih lanjut dan booking konsultasi
                  </p>
                  <Button variant="hero" size="lg" asChild>
                    <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Safety Equipment Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-primary text-primary-foreground text-xs md:text-sm">Keamanan Utama</Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                Perlengkapan <span className="text-gradient">Safety</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Semua perlengkapan keamanan disediakan dan wajib digunakan selama sesi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Coverall Safety", desc: "Pakaian pelindung penuh" },
                { name: "Helm Safety", desc: "Melindungi kepala dari pecahan" },
                { name: "Sarung Tangan", desc: "Pelindung tangan tebal" },
                { name: "Safety Goggles", desc: "Pelindung mata" },
              ].map((item, idx) => (
                <Card key={idx} className="text-center border-border hover:border-caution transition-colors">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-caution/10 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-caution" />
                    </div>
                    <h4 className="font-bold mb-2">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About & Safety Section */}
        <section id="about" className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-primary-foreground">Keamanan & Prosedur</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Aturan <span className="text-gradient">Keamanan</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Keselamatan Anda adalah prioritas utama kami
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {safetyRules.map((rule, index) => (
                <Card key={index} className="border-border hover:border-primary transition-colors">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <rule.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Procedures */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Alur <span className="text-gradient">Sesi</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {procedures.map((proc, index) => (
                  <div key={index} className="relative">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg">
                        {proc.step}
                      </div>
                      <h4 className="font-bold mb-2">{proc.title}</h4>
                      <p className="text-sm text-muted-foreground">{proc.description}</p>
                    </div>
                    {index < procedures.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                <span className="text-gradient">FAQ</span> - Pertanyaan Umum
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2 text-primary">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Location/Map Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-card/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-primary-foreground shadow-glow">Lokasi Kami</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Temukan <span className="text-gradient">Breakroom</span> Depok
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-2 text-lg">
                📍 Kelapa Dua, Kota Depok, Jawa Barat
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Lokasi strategis di Depok, dekat dengan Jakarta Selatan. Mudah diakses dari Lenteng Agung, Pancoran, dan area Jakarta Selatan lainnya (15-25 menit via kendaraan).
              </p>
            </div>

            <div className="relative group">
              <Card className="overflow-hidden border-2 border-border shadow-glow hover:shadow-[0_0_50px_rgba(var(--primary),0.3)] transition-all duration-500">
                <CardContent className="p-0 relative">
                  <div className="aspect-video w-full relative overflow-hidden">
                    {/* Gradient overlay for premium look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.277342638673!2d106.83900657630343!3d-6.358136693631881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed00289e1189%3A0x76e086b5b8691047!2sBREAKROOM%20DEPOK!5e0!3m2!1sen!2sid!4v1763554402977!5m2!1sen!2sid" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi Breakroom Depok"
                      className="w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Modern "View in Google Maps" button */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <Button
                      asChild
                      className="bg-background/90 backdrop-blur-md border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
                    >
                      <a
                        href="https://www.google.com/maps/place/BREAKROOM+DEPOK/@-6.358136693631881,106.83900657630343,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ed00289e1189:0x76e086b5b8691047!8m2!3d-6.3581367!4d106.8416142!16s%2Fg%2F11y2ww1t_y?entry=ttu"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Buka di Google Maps
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-glow hover:-translate-y-1 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <MapPin className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="font-bold mb-2 text-lg">Lokasi Strategis</h4>
                  <p className="text-sm text-muted-foreground">Dekat dengan Jakarta Selatan (Lenteng Agung, Pancoran)</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-glow hover:-translate-y-1 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Clock className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="font-bold mb-2 text-lg">Akses Mudah</h4>
                  <p className="text-sm text-muted-foreground">15-25 menit dari area Jakarta Selatan</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-glow hover:-translate-y-1 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <MessageCircle className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="font-bold mb-2 text-lg">Hubungi Kami</h4>
                  <p className="text-sm text-muted-foreground">Via WhatsApp untuk petunjuk arah detail</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
