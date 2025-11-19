import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Clock, Users, Heart, AlertTriangle, FileCheck, Instagram, MessageCircle, MapPin, Check, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReviewsSection } from "@/components/ReviewsSection";
import heroImage from "@/assets/hero-breakroom.jpg";
import roomClassic from "@/assets/room-classic.jpg";
import roomPremium from "@/assets/room-premium.jpg";
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
                <a href="https://wa.me/62YOUR_NUMBER" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Booking via WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#rooms">Lihat Ruangan</a>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* What is Breakroom Section */}
        <section id="tentang" className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-accent text-accent-foreground">Apa itu Breakroom?</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Tempat <span className="text-gradient">Stress-Release</span> Pertama di Indonesia
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Breakroom Depok adalah ruang pelepasan emosi yang aman dan terkontrol. Di sini, kamu bisa melampiaskan stress, frustrasi, atau emosi terpendam dengan cara yang berbeda—hancurkan barang dalam lingkungan yang dirancang khusus untuk itu.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Bukan hanya tentang menghancurkan barang. Ini tentang memberikan diri kamu ruang untuk melepaskan tekanan hidup dengan cara yang aman, legal, dan bahkan menyenangkan.
                </p>
                <div className="space-y-3">
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
              <div className="relative">
                <img 
                  src={safetyGear} 
                  alt="Safety Equipment"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute top-4 left-4 bg-caution/90 backdrop-blur-sm px-4 py-2 rounded border border-caution">
                  <span className="text-sm font-bold text-caution-foreground">100% AMAN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery/Video Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-primary-foreground">Lihat Aksi</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Galeri & <span className="text-gradient">Video</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lihat pengalaman nyata pelanggan kami dan rasakan sensasinya
              </p>
            </div>
            
            {/* Placeholder for photos and videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Video Placeholder */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-2 bg-muted/30 border-2 border-dashed border-border overflow-hidden">
                <CardContent className="p-0 aspect-video flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Play className="w-16 h-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground font-medium">Tempat untuk video showcase utama</p>
                    <p className="text-sm text-muted-foreground px-4">Unggah video highlight pengalaman Breakroom</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Photo Placeholders */}
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-muted/30 border-2 border-dashed border-border overflow-hidden">
                  <CardContent className="p-0 aspect-square flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-muted rounded-full mx-auto flex items-center justify-center">
                        <span className="text-muted-foreground text-xl font-bold">{i}</span>
                      </div>
                      <p className="text-sm text-muted-foreground px-4">Foto aktivitas / ruangan</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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

        {/* Rooms Detail Section */}
        <section id="rooms" className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-primary-foreground">Pilih Ruangan Anda</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Temukan <span className="text-gradient">Ruangan</span> yang Tepat
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Setiap ruangan dirancang untuk memberikan pengalaman pelepasan stress yang aman dan memuaskan
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {roomDetails.map((room) => (
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
                      <h4 className="font-semibold text-sm uppercase tracking-wide">Yang Anda Dapatkan:</h4>
                      {room.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button variant="hero" className="w-full" size="lg" asChild>
                      <a href="https://wa.me/62YOUR_NUMBER" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Booking {room.name}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Equipment Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-caution text-caution-foreground">Keamanan Utama</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
              <Badge className="mb-4 bg-accent text-accent-foreground">Keamanan & Prosedur</Badge>
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

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Masih Ada <span className="text-gradient">Pertanyaan?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Hubungi kami melalui Instagram atau WhatsApp untuk informasi lebih lanjut
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <a href="https://wa.me/62YOUR_NUMBER" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="https://instagram.com/breakroom.depok" target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-5 w-5" />
                      Instagram
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Location/Map Section */}
        <section className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent text-accent-foreground">Lokasi Kami</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Temukan <span className="text-gradient">Breakroom</span> Depok
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
                📍 Kelapa Dua, Kota Depok, Jawa Barat
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Lokasi strategis di Depok, dekat dengan Jakarta Selatan. Mudah diakses dari Lenteng Agung, Pancoran, dan area Jakarta Selatan lainnya (15-25 menit via kendaraan).
              </p>
            </div>

            <Card className="overflow-hidden border-border">
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.277342638673!2d106.83900657630343!3d-6.358136693631881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed00289e1189%3A0x76e086b5b8691047!2sBREAKROOM%20DEPOK!5e0!3m2!1sen!2sid!4v1763554402977!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Breakroom Depok"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <Card className="border-border">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Lokasi Strategis</h4>
                  <p className="text-sm text-muted-foreground">Dekat dengan Jakarta Selatan (Lenteng Agung, Pancoran)</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Akses Mudah</h4>
                  <p className="text-sm text-muted-foreground">15-25 menit dari area Jakarta Selatan</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Hubungi Kami</h4>
                  <p className="text-sm text-muted-foreground">Via WhatsApp untuk petunjuk arah detail</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Melepaskan Stress Anda?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Booking sekarang dan rasakan pengalaman pelepasan stress yang berbeda
            </p>
            <Button variant="hero" size="xl" asChild>
              <a href="https://wa.me/62YOUR_NUMBER" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Booking via WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
