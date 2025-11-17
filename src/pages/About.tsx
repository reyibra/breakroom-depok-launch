import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, FileCheck, Users, Heart, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import safetyGear from "@/assets/safety-gear.jpg";

const About = () => {
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
      title: "Batasan Usia",
      description: "Peserta minimal berusia 15 tahun. Peserta di bawah 18 tahun harus didampingi orang tua/wali."
    },
    {
      icon: Heart,
      title: "Kondisi Kesehatan",
      description: "Tidak disarankan untuk ibu hamil atau orang dengan kondisi jantung/kesehatan tertentu."
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
      
      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="py-12 px-4 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Tentang Kami</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tentang <span className="text-gradient">Breakroom</span> Depok
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tempat pertama di Indonesia untuk melepaskan stress dengan cara yang unik, aman, dan terkontrol
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary text-primary-foreground">Cerita Kami</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Mengapa Breakroom <span className="text-gradient">Ada?</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Di tengah tekanan hidup modern, seringkali kita butuh cara untuk melepaskan stress yang menumpuk. 
                    Breakroom Depok hadir sebagai solusi alternatif yang aman dan efektif.
                  </p>
                  <p>
                    Kami percaya bahwa melepaskan emosi dengan cara yang terkontrol dapat membantu kesehatan mental. 
                    Di ruangan kami, Anda bebas berteriak, memukul, dan menghancurkan tanpa judgment—dalam lingkungan 
                    yang sepenuhnya aman.
                  </p>
                  <p className="font-bold text-foreground">
                    "Luapkan, Lepaskan, Lupakan" - itulah moto kami dalam membantu Anda menemukan ketenangan.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={safetyGear} 
                  alt="Breakroom Story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Safety Rules */}
        <section className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-caution text-caution-foreground">Keamanan Prioritas</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Peraturan <span className="text-gradient">Keamanan</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Kami sangat serius soal keamanan. Berikut adalah aturan yang wajib dipatuhi:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safetyRules.map((rule, index) => (
                <Card key={index} className="border-2 border-border hover:border-caution transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-caution/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <rule.icon className="w-6 h-6 text-caution" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{rule.title}</h3>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Procedures */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent text-accent-foreground">Prosedur</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tata Cara <span className="text-gradient">Sesi</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ikuti langkah-langkah berikut untuk pengalaman optimal
              </p>
            </div>

            <div className="space-y-6">
              {procedures.map((proc, index) => (
                <Card key={index} className="border-2 border-border hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-primary-foreground">
                        {proc.step}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-xl mb-2">{proc.title}</h3>
                        <p className="text-muted-foreground">{proc.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-primary-foreground">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pertanyaan <span className="text-gradient">Umum</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <FileCheck className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold mb-2">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary">
              <CardContent className="p-12 text-center">
                <Zap className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl font-bold mb-4">Masih Ada Pertanyaan?</h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Hubungi kami melalui Instagram atau WhatsApp untuk informasi lebih lanjut
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://instagram.com/breakroom.depok" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://wa.me/628123456789" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-8 rounded-md border-2 border-primary text-foreground font-medium hover:bg-primary/10 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
