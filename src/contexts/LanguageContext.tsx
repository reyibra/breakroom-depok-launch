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
    
    // Price Badge
    'price.startFrom': 'Mulai Dari',
    
    // Hero
    'hero.startFrom': 'Mulai Dari',
    'hero.title1': 'Luapkan',
    'hero.title2': 'Lepaskan',
    'hero.title3': 'Lupakan',
    'hero.subtitle': 'Penatmu di Breakroom Depok',
    'hero.description': 'Tempat aman untuk melepaskan stress dengan cara yang berbeda. Hancurkan, teriak, dan rasakan kebebasan.',
    'hero.bookNow': 'Booking Sekarang',
    'hero.viewServices': 'Lihat Layanan',
    'hero.promoInfo': 'INFO PROMO',
    'hero.remaining': 'tersisa',
    'hero.days': 'Hari',
    'hero.hours': 'Jam',
    'hero.minutes': 'Menit',
    'hero.seconds': 'Detik',
    'hero.discount': 'Diskon',
    'hero.code': 'Kode',
    'hero.validUntil': 'Berlaku hingga',
    'hero.endsIn': 'Berakhir Dalam',
    'hero.bookWithPromo': 'Booking dengan Promo Ini',
    'hero.descriptionLabel': 'Deskripsi',
    'hero.startDate': 'Mulai',
    'hero.endDate': 'Berakhir',
    
    // About Section
    'about.badge': 'Apa itu Breakroom?',
    'about.title': 'Tempat Stress-Release Pertama di Indonesia',
    'about.description1': 'Breakroom Depok adalah ruang pelepasan emosi yang aman dan terkontrol. Di sini, kamu bisa melampiaskan stress, frustrasi, atau emosi terpendam dengan cara yang berbeda—hancurkan barang dalam lingkungan yang dirancang khusus untuk itu.',
    'about.description2': 'Bukan hanya tentang menghancurkan barang. Ini tentang memberikan diri kamu ruang untuk melepaskan tekanan hidup dengan cara yang aman, legal, dan bahkan menyenangkan.',
    'about.feature1': 'Lingkungan Aman & Terkontrol',
    'about.feature2': 'Perlengkapan Safety Lengkap',
    'about.feature3': 'Staff Profesional Siap Membantu',
    
    // Video Gallery
    'gallery.title': 'Galeri Video',
    'gallery.badge': 'Video Showcase',
    'gallery.description': 'Lihat pengalaman nyata pelanggan kami dan rasakan sensasinya',
    
    // News
    'news.title': 'Berita Terbaru',
    'news.badge': 'Update Terkini',
    'news.subtitle': 'Informasi dan update terbaru dari Breakroom Depok',
    'news.readMore': 'Baca Selengkapnya',
    'news.published': 'Dipublikasikan pada',
    'news.close': 'Tutup',
    'news.loadMore': 'Muat Lebih Banyak',
    
    // Promo
    'promo.title': 'Promo Spesial',
    'promo.badge': 'Penawaran Terbaik',
    'promo.subtitle': 'Dapatkan penawaran terbaik untuk pengalaman Breakroom Anda',
    'promo.discount': 'Diskon',
    'promo.code': 'Kode',
    'promo.validPeriod': 'Periode',
    'promo.until': 'hingga',
    'promo.use': 'Gunakan Promo',
    
    // Features / Why Choose Breakroom
    'features.title': 'Kenapa Pilih Breakroom?',
    'features.energy.title': 'Pelepasan Energi',
    'features.energy.desc': 'Lepaskan stress dengan cara yang aman dan terkontrol',
    'features.safety.title': 'Keamanan Terjamin',
    'features.safety.desc': 'Perlengkapan safety lengkap dan prosedur keamanan ketat',
    'features.flexible.title': 'Fleksibel',
    'features.flexible.desc': 'Pilih durasi sesi sesuai kebutuhan Anda',
    'features.group.title': 'Private & Group',
    'features.group.desc': 'Tersedia untuk individu maupun kelompok',
    
    // Consultation
    'consultation.title': 'Konsultasi Psikologi',
    'consultation.badge': 'Layanan Profesional',
    'consultation.subtitle': 'Dapatkan dukungan profesional untuk kesehatan mental Anda',
    'consultation.description': 'Kami menyediakan layanan konsultasi psikologi untuk membantu Anda mengatasi stress dan masalah emosional',
    'consultation.online': 'Online',
    'consultation.offline': 'Offline',
    'consultation.onlineTitle': 'Konsultasi Online',
    'consultation.offlineTitle': 'Konsultasi Offline',
    'consultation.onlineDesc': 'Konsultasi dari mana saja dengan psikolog berpengalaman melalui video call',
    'consultation.offlineDesc': 'Sesi tatap muka langsung di ruangan privat yang nyaman',
    'consultation.cta': 'Konsultasi Sekarang',
    
    // Safety Rules
    'safety.title': 'Keamanan & Prosedur',
    'safety.badge': 'Safety First',
    'safety.subtitle': 'Keselamatan Anda adalah prioritas kami',
    'safety.rules.title': 'Peraturan Keamanan',
    'safety.rule1.title': 'Wajib Menggunakan APD',
    'safety.rule1.desc': 'Semua peserta wajib menggunakan alat pelindung diri (coverall, helm, sarung tangan) selama sesi berlangsung.',
    'safety.rule2.title': 'Ikuti Instruksi Staff',
    'safety.rule2.desc': 'Dengarkan dan ikuti semua instruksi dari staff kami untuk keamanan maksimal.',
    'safety.rule3.title': 'Persyaratan Usia',
    'safety.rule3.desc': 'Peserta minimal berusia 17 tahun ke atas.',
    'safety.rule4.title': 'Persyaratan Kesehatan',
    'safety.rule4.desc': 'Tidak diperbolehkan untuk ibu hamil. Harap konfirmasi jika memiliki kondisi kesehatan khusus.',
    
    // Session Flow / Procedures
    'flow.title': 'Alur Sesi',
    'flow.badge': 'Cara Kerja',
    'flow.subtitle': 'Bagaimana sesi Breakroom berlangsung',
    'flow.step1.title': 'Check-in & Briefing',
    'flow.step1.desc': 'Tiba 10 menit sebelum sesi. Staff akan memberikan penjelasan safety dan prosedur.',
    'flow.step2.title': 'Pemakaian APD',
    'flow.step2.desc': 'Kenakan coverall safety, helm, dan sarung tangan yang telah disediakan.',
    'flow.step3.title': 'Masuk Ruangan',
    'flow.step3.desc': 'Staff akan mengantar Anda ke ruangan dan memastikan semua peralatan siap.',
    'flow.step4.title': 'Sesi Dimulai',
    'flow.step4.desc': 'Luapkan emosi Anda! Hancurkan item yang tersedia sesuai waktu yang dipilih.',
    'flow.step5.title': 'Selesai & Clean Up',
    'flow.step5.desc': 'Staff akan membersihkan ruangan. Anda bisa beristirahat dan minum di area lounge.',
    
    // FAQ
    'faq.title': 'Pertanyaan yang Sering Diajukan',
    'faq.badge': 'FAQ',
    'faq.subtitle': 'Temukan jawaban untuk pertanyaan umum tentang Breakroom',
    'faq.search': 'Cari pertanyaan...',
    'faq.category': 'Kategori',
    'faq.all': 'Semua',
    'faq.noResults': 'Tidak ada pertanyaan yang sesuai dengan pencarian Anda',
    'faq.q1': 'Apakah aman?',
    'faq.a1': 'Sangat aman! Kami menggunakan perlengkapan safety standar industri dan staff terlatih siap membantu.',
    'faq.q2': 'Apa yang boleh dihancurkan?',
    'faq.a2': 'Item yang disediakan meliputi piring, gelas, botol, dan untuk paket premium ada elektronik bekas (TV, printer, keyboard).',
    'faq.q3': 'Boleh bawa item sendiri?',
    'faq.a3': 'Mohon konfirmasi terlebih dahulu dengan tim kami. Beberapa item mungkin tidak diperbolehkan karena alasan keamanan.',
    'faq.q4': 'Bagaimana jika terlambat?',
    'faq.a4': 'Jika terlambat lebih dari 15 menit, waktu sesi akan dikurangi sesuai keterlambatan.',
    'faq.q5': 'Bisakah reschedule?',
    'faq.a5': 'Ya, reschedule bisa dilakukan maksimal H-1 dari jadwal booking.',
    'faq.q6': 'Apa yang harus dibawa?',
    'faq.a6': 'Cukup bawa diri Anda! Semua perlengkapan sudah kami sediakan. Disarankan pakai pakaian nyaman.',
    
    // Location
    'location.title': 'Temukan Breakroom Depok',
    'location.badge': 'Lokasi Kami',
    'location.subtitle': 'Kunjungi kami di lokasi yang mudah dijangkau',
    'location.address': 'Alamat',
    'location.addressDetail': 'Jl. Margonda Raya No. 123, Depok, Jawa Barat',
    'location.hours': 'Jam Operasional',
    'location.hoursMon': 'Senin - Jumat',
    'location.hoursMonDetail': '10:00 - 22:00 WIB',
    'location.hoursSat': 'Sabtu - Minggu',
    'location.hoursSatDetail': '09:00 - 23:00 WIB',
    'location.contact': 'Kontak',
    'location.phone': 'Telepon',
    'location.whatsapp': 'WhatsApp',
    'location.getDirections': 'Dapatkan Arah',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Kontak',
    'footer.followUs': 'Ikuti Kami',
    'footer.rights': 'Hak Cipta',
    'footer.allRights': 'Semua hak dilindungi',
    'footer.tagline': 'Luapkan, Lepaskan & Lupakan Penatmu di stress-release room pertama di Indonesia',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Terjadi kesalahan',
    'common.success': 'Berhasil',
    'common.close': 'Tutup',
    'common.submit': 'Kirim',
    'common.cancel': 'Batal',
    'common.step': 'Langkah',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About & Safety',
    'nav.booking': 'Book Now',
    
    // Price Badge
    'price.startFrom': 'Starting From',
    
    // Hero
    'hero.startFrom': 'Starting From',
    'hero.title1': 'Release',
    'hero.title2': 'Let Go',
    'hero.title3': 'Forget',
    'hero.subtitle': 'Your Stress at Breakroom Depok',
    'hero.description': 'A safe place to release stress in a different way. Smash, scream, and feel the freedom.',
    'hero.bookNow': 'Book Now',
    'hero.viewServices': 'View Services',
    'hero.promoInfo': 'PROMO INFO',
    'hero.remaining': 'remaining',
    'hero.days': 'Days',
    'hero.hours': 'Hours',
    'hero.minutes': 'Minutes',
    'hero.seconds': 'Seconds',
    'hero.discount': 'Discount',
    'hero.code': 'Code',
    'hero.validUntil': 'Valid until',
    'hero.endsIn': 'Ends In',
    'hero.bookWithPromo': 'Book with This Promo',
    'hero.descriptionLabel': 'Description',
    'hero.startDate': 'Start',
    'hero.endDate': 'End',
    
    // About Section
    'about.badge': 'What is Breakroom?',
    'about.title': "Indonesia's First Stress-Release Room",
    'about.description1': 'Breakroom Depok is a safe and controlled emotional release space. Here, you can vent stress, frustration, or pent-up emotions in a different way—smash things in an environment specifically designed for it.',
    'about.description2': "It's not just about breaking things. It's about giving yourself space to release life's pressure in a safe, legal, and even fun way.",
    'about.feature1': 'Safe & Controlled Environment',
    'about.feature2': 'Complete Safety Equipment',
    'about.feature3': 'Professional Staff Ready to Help',
    
    // Video Gallery
    'gallery.title': 'Video Gallery',
    'gallery.badge': 'Video Showcase',
    'gallery.description': 'See real customer experiences and feel the sensation',
    
    // News
    'news.title': 'Latest News',
    'news.badge': 'Recent Updates',
    'news.subtitle': 'Latest information and updates from Breakroom Depok',
    'news.readMore': 'Read More',
    'news.published': 'Published on',
    'news.close': 'Close',
    'news.loadMore': 'Load More',
    
    // Promo
    'promo.title': 'Special Promos',
    'promo.badge': 'Best Offers',
    'promo.subtitle': 'Get the best deals for your Breakroom experience',
    'promo.discount': 'Discount',
    'promo.code': 'Code',
    'promo.validPeriod': 'Period',
    'promo.until': 'until',
    'promo.use': 'Use Promo',
    
    // Features / Why Choose Breakroom
    'features.title': 'Why Choose Breakroom?',
    'features.energy.title': 'Energy Release',
    'features.energy.desc': 'Release stress in a safe and controlled way',
    'features.safety.title': 'Guaranteed Safety',
    'features.safety.desc': 'Complete safety equipment and strict security procedures',
    'features.flexible.title': 'Flexible',
    'features.flexible.desc': 'Choose session duration according to your needs',
    'features.group.title': 'Private & Group',
    'features.group.desc': 'Available for individuals or groups',
    
    // Consultation
    'consultation.title': 'Psychology Consultation',
    'consultation.badge': 'Professional Service',
    'consultation.subtitle': 'Get professional support for your mental health',
    'consultation.description': 'We provide psychology consultation services to help you cope with stress and emotional problems',
    'consultation.online': 'Online',
    'consultation.offline': 'Offline',
    'consultation.onlineTitle': 'Online Consultation',
    'consultation.offlineTitle': 'Offline Consultation',
    'consultation.onlineDesc': 'Consult from anywhere with experienced psychologists via video call',
    'consultation.offlineDesc': 'Direct face-to-face sessions in comfortable private rooms',
    'consultation.cta': 'Consult Now',
    
    // Safety Rules
    'safety.title': 'Safety & Procedures',
    'safety.badge': 'Safety First',
    'safety.subtitle': 'Your safety is our priority',
    'safety.rules.title': 'Safety Rules',
    'safety.rule1.title': 'Must Use PPE',
    'safety.rule1.desc': 'All participants must use personal protective equipment (coveralls, helmets, gloves) during the session.',
    'safety.rule2.title': 'Follow Staff Instructions',
    'safety.rule2.desc': 'Listen to and follow all instructions from our staff for maximum safety.',
    'safety.rule3.title': 'Age Requirement',
    'safety.rule3.desc': 'Participants must be at least 17 years old.',
    'safety.rule4.title': 'Health Requirements',
    'safety.rule4.desc': 'Not allowed for pregnant women. Please confirm if you have special health conditions.',
    
    // Session Flow / Procedures
    'flow.title': 'Session Flow',
    'flow.badge': 'How It Works',
    'flow.subtitle': 'How a Breakroom session works',
    'flow.step1.title': 'Check-in & Briefing',
    'flow.step1.desc': 'Arrive 10 minutes before the session. Staff will provide safety explanation and procedures.',
    'flow.step2.title': 'Wearing PPE',
    'flow.step2.desc': 'Put on the provided safety coveralls, helmet, and gloves.',
    'flow.step3.title': 'Enter the Room',
    'flow.step3.desc': 'Staff will escort you to the room and ensure all equipment is ready.',
    'flow.step4.title': 'Session Starts',
    'flow.step4.desc': 'Release your emotions! Smash the available items according to your chosen time.',
    'flow.step5.title': 'Finish & Clean Up',
    'flow.step5.desc': 'Staff will clean the room. You can rest and have a drink in the lounge area.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.badge': 'FAQ',
    'faq.subtitle': 'Find answers to common questions about Breakroom',
    'faq.search': 'Search questions...',
    'faq.category': 'Category',
    'faq.all': 'All',
    'faq.noResults': 'No questions match your search',
    'faq.q1': 'Is it safe?',
    'faq.a1': 'Very safe! We use industry-standard safety equipment and trained staff are ready to help.',
    'faq.q2': 'What can be destroyed?',
    'faq.a2': 'Provided items include plates, glasses, bottles, and for premium packages there are used electronics (TV, printer, keyboard).',
    'faq.q3': 'Can I bring my own items?',
    'faq.a3': 'Please confirm with our team first. Some items may not be allowed for safety reasons.',
    'faq.q4': 'What if I\'m late?',
    'faq.a4': 'If you are more than 15 minutes late, session time will be reduced according to the delay.',
    'faq.q5': 'Can I reschedule?',
    'faq.a5': 'Yes, rescheduling can be done at least 1 day before the booking schedule.',
    'faq.q6': 'What should I bring?',
    'faq.a6': 'Just bring yourself! All equipment is provided. Comfortable clothes are recommended.',
    
    // Location
    'location.title': 'Find Breakroom Depok',
    'location.badge': 'Our Location',
    'location.subtitle': 'Visit us at an easily accessible location',
    'location.address': 'Address',
    'location.addressDetail': 'Jl. Margonda Raya No. 123, Depok, West Java',
    'location.hours': 'Operating Hours',
    'location.hoursMon': 'Monday - Friday',
    'location.hoursMonDetail': '10:00 AM - 10:00 PM',
    'location.hoursSat': 'Saturday - Sunday',
    'location.hoursSatDetail': '09:00 AM - 11:00 PM',
    'location.contact': 'Contact',
    'location.phone': 'Phone',
    'location.whatsapp': 'WhatsApp',
    'location.getDirections': 'Get Directions',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'Copyright',
    'footer.allRights': 'All rights reserved',
    'footer.tagline': "Release, Let Go & Forget Your Stress at Indonesia's first stress-release room",
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.step': 'Step',
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
