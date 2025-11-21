import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  id: {
    // Navbar
    'nav.home': 'Beranda',
    'nav.services': 'Layanan',
    'nav.about': 'Tentang & Keamanan',
    'nav.booking': 'Booking Sekarang',
    
    // Hero
    'hero.startFrom': 'Mulai Dari',
    'hero.promoInfo': 'INFO PROMO',
    'hero.remaining': 'tersisa',
    'hero.days': 'Hari',
    'hero.hours': 'Jam',
    'hero.minutes': 'Menit',
    'hero.seconds': 'Detik',
    'hero.discount': 'Diskon',
    'hero.code': 'Kode',
    'hero.validUntil': 'Berlaku hingga',
    'hero.bookNow': 'Booking Sekarang',
    
    // Video Gallery
    'gallery.title': 'Galeri Video',
    'gallery.badge': 'Video Showcase',
    
    // News
    'news.title': 'Berita Terbaru',
    'news.badge': 'Update Terkini',
    'news.subtitle': 'Informasi dan update terbaru dari Breakroom Depok',
    'news.readMore': 'Baca Selengkapnya',
    'news.published': 'Dipublikasikan pada',
    'news.close': 'Tutup',
    
    // Promo
    'promo.title': 'Promo Spesial',
    'promo.badge': 'Penawaran Terbaik',
    'promo.subtitle': 'Dapatkan penawaran terbaik untuk pengalaman Breakroom Anda',
    'promo.discount': 'Diskon',
    'promo.code': 'Kode',
    'promo.validPeriod': 'Periode',
    'promo.until': 'hingga',
    'promo.use': 'Gunakan Promo',
    
    // About
    'about.title': 'Kenapa Pilih Breakroom?',
    'about.badge': 'Tentang Kami',
    'about.point1.title': 'Ruang Aman & Terkontrol',
    'about.point1.desc': 'Dilengkapi dengan peralatan keselamatan lengkap dan dipandu oleh staff profesional',
    'about.point2.title': 'Pelepas Stress Efektif',
    'about.point2.desc': 'Metode terbukti untuk melepas emosi negatif dengan cara yang sehat dan terkontrol',
    'about.point3.title': 'Privasi Terjamin',
    'about.point3.desc': 'Ruangan privat untuk kenyamanan maksimal dalam melepaskan stress Anda',
    
    // Consultation
    'consultation.title': 'Konsultasi Psikologi',
    'consultation.badge': 'Layanan Profesional',
    'consultation.subtitle': 'Dapatkan dukungan profesional untuk kesehatan mental Anda',
    'consultation.online': 'Online',
    'consultation.offline': 'Offline',
    'consultation.onlineDesc': 'Konsultasi dari mana saja dengan psikolog berpengalaman melalui video call',
    'consultation.offlineDesc': 'Sesi tatap muka langsung di ruangan privat yang nyaman',
    'consultation.cta': 'Konsultasi Sekarang',
    
    // Safety
    'safety.title': 'Keamanan & Prosedur',
    'safety.badge': 'Safety First',
    'safety.point1.title': 'Peralatan Keselamatan',
    'safety.point1.desc': 'Sarung tangan, helm, pelindung wajah, dan safety gear lengkap disediakan',
    'safety.point2.title': 'Briefing Keamanan',
    'safety.point2.desc': 'Penjelasan lengkap prosedur dan aturan sebelum memulai sesi',
    'safety.point3.title': 'Supervised Session',
    'safety.point3.desc': 'Staff profesional mendampingi dan memantau sepanjang sesi berlangsung',
    
    // Session Flow
    'flow.title': 'Alur Sesi',
    'flow.badge': 'Cara Kerja',
    'flow.step1.title': 'Booking',
    'flow.step1.desc': 'Pilih tanggal dan waktu yang sesuai melalui WhatsApp',
    'flow.step2.title': 'Check-in',
    'flow.step2.desc': 'Datang 10 menit sebelum jadwal untuk persiapan',
    'flow.step3.title': 'Briefing',
    'flow.step3.desc': 'Dapatkan penjelasan keamanan dan aturan sesi',
    'flow.step4.title': 'Start Session',
    'flow.step4.desc': 'Mulai sesi pelepasan stress dengan aman',
    
    // FAQ
    'faq.title': 'Pertanyaan yang Sering Diajukan',
    'faq.badge': 'FAQ',
    'faq.subtitle': 'Temukan jawaban untuk pertanyaan umum tentang Breakroom',
    'faq.search': 'Cari pertanyaan...',
    'faq.category': 'Kategori',
    'faq.all': 'Semua',
    'faq.noResults': 'Tidak ada pertanyaan yang sesuai dengan pencarian Anda',
    
    // Location
    'location.title': 'Temukan Breakroom Depok',
    'location.badge': 'Lokasi Kami',
    'location.subtitle': 'Kunjungi kami di lokasi yang mudah dijangkau',
    'location.address': 'Alamat',
    'location.hours': 'Jam Operasional',
    'location.contact': 'Kontak',
    'location.getDirections': 'Dapatkan Arah',
    'location.hoursMon': 'Senin - Jumat',
    'location.hoursSat': 'Sabtu - Minggu',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Kontak',
    'footer.followUs': 'Ikuti Kami',
    'footer.rights': 'Hak Cipta',
    'footer.allRights': 'Semua hak dilindungi',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Terjadi kesalahan',
    'common.success': 'Berhasil',
    'common.close': 'Tutup',
    'common.submit': 'Kirim',
    'common.cancel': 'Batal',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About & Safety',
    'nav.booking': 'Book Now',
    
    // Hero
    'hero.startFrom': 'Starting From',
    'hero.promoInfo': 'PROMO INFO',
    'hero.remaining': 'remaining',
    'hero.days': 'Days',
    'hero.hours': 'Hours',
    'hero.minutes': 'Minutes',
    'hero.seconds': 'Seconds',
    'hero.discount': 'Discount',
    'hero.code': 'Code',
    'hero.validUntil': 'Valid until',
    'hero.bookNow': 'Book Now',
    
    // Video Gallery
    'gallery.title': 'Video Gallery',
    'gallery.badge': 'Video Showcase',
    
    // News
    'news.title': 'Latest News',
    'news.badge': 'Recent Updates',
    'news.subtitle': 'Latest information and updates from Breakroom Depok',
    'news.readMore': 'Read More',
    'news.published': 'Published on',
    'news.close': 'Close',
    
    // Promo
    'promo.title': 'Special Promos',
    'promo.badge': 'Best Offers',
    'promo.subtitle': 'Get the best deals for your Breakroom experience',
    'promo.discount': 'Discount',
    'promo.code': 'Code',
    'promo.validPeriod': 'Period',
    'promo.until': 'until',
    'promo.use': 'Use Promo',
    
    // About
    'about.title': 'Why Choose Breakroom?',
    'about.badge': 'About Us',
    'about.point1.title': 'Safe & Controlled Space',
    'about.point1.desc': 'Equipped with complete safety equipment and guided by professional staff',
    'about.point2.title': 'Effective Stress Relief',
    'about.point2.desc': 'Proven method to release negative emotions in a healthy and controlled way',
    'about.point3.title': 'Privacy Guaranteed',
    'about.point3.desc': 'Private rooms for maximum comfort in releasing your stress',
    
    // Consultation
    'consultation.title': 'Psychology Consultation',
    'consultation.badge': 'Professional Service',
    'consultation.subtitle': 'Get professional support for your mental health',
    'consultation.online': 'Online',
    'consultation.offline': 'Offline',
    'consultation.onlineDesc': 'Consult from anywhere with experienced psychologists via video call',
    'consultation.offlineDesc': 'Direct face-to-face sessions in comfortable private rooms',
    'consultation.cta': 'Consult Now',
    
    // Safety
    'safety.title': 'Safety & Procedures',
    'safety.badge': 'Safety First',
    'safety.point1.title': 'Safety Equipment',
    'safety.point1.desc': 'Gloves, helmets, face shields, and complete safety gear provided',
    'safety.point2.title': 'Safety Briefing',
    'safety.point2.desc': 'Complete explanation of procedures and rules before starting the session',
    'safety.point3.title': 'Supervised Session',
    'safety.point3.desc': 'Professional staff accompany and monitor throughout the session',
    
    // Session Flow
    'flow.title': 'Session Flow',
    'flow.badge': 'How It Works',
    'flow.step1.title': 'Booking',
    'flow.step1.desc': 'Choose suitable date and time via WhatsApp',
    'flow.step2.title': 'Check-in',
    'flow.step2.desc': 'Arrive 10 minutes before schedule for preparation',
    'flow.step3.title': 'Briefing',
    'flow.step3.desc': 'Get safety explanation and session rules',
    'flow.step4.title': 'Start Session',
    'flow.step4.desc': 'Begin stress relief session safely',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.badge': 'FAQ',
    'faq.subtitle': 'Find answers to common questions about Breakroom',
    'faq.search': 'Search questions...',
    'faq.category': 'Category',
    'faq.all': 'All',
    'faq.noResults': 'No questions match your search',
    
    // Location
    'location.title': 'Find Breakroom Depok',
    'location.badge': 'Our Location',
    'location.subtitle': 'Visit us at an easily accessible location',
    'location.address': 'Address',
    'location.hours': 'Operating Hours',
    'location.contact': 'Contact',
    'location.getDirections': 'Get Directions',
    'location.hoursMon': 'Monday - Friday',
    'location.hoursSat': 'Saturday - Sunday',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'Copyright',
    'footer.allRights': 'All rights reserved',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' ? 'en' : 'id') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
