import { MapPin, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {/* Brand - Mobile Optimized */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/src/assets/breakroom-logo-footer.jpg" 
                alt="Breakroom Depok Logo"
                loading="lazy"
                className="w-10 h-10 md:w-10 md:h-10 rounded-full object-cover"
              />
              <span className="text-lg md:text-xl font-bold">Breakroom Depok</span>
            </div>
            <p className="text-sm md:text-sm text-muted-foreground mb-4 leading-relaxed">
              Luapkan, Lepaskan & Lupakan Penatmu di stress-release room pertama di Indonesia
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/breakroom.depok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.tiktok.com/@breakroom.depok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/6282312504723"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2"
                aria-label="WhatsApp"
              >
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links - Mobile Optimized */}
          <div>
            <h3 className="text-base md:text-base font-bold mb-4 text-foreground">Link Cepat</h3>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block py-1 leading-relaxed">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block py-1 leading-relaxed">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block py-1 leading-relaxed">
                  Tentang & Keamanan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact - Mobile Optimized */}
          <div>
            <h3 className="text-base md:text-base font-bold mb-4 text-foreground">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">Kelapa Dua, Kota Depok, Jawa Barat</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone size={16} className="flex-shrink-0 text-primary" />
                <a href="tel:+6282312504723" className="hover:text-primary transition-colors py-1 leading-relaxed">
                  +62 823-1250-4723
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail size={16} className="flex-shrink-0 text-primary" />
                <a href="mailto:info@breakroom.id" className="hover:text-primary transition-colors py-1 leading-relaxed">
                  info@breakroom.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 md:pt-8 text-center text-sm text-muted-foreground">
          <p className="leading-relaxed">&copy; {new Date().getFullYear()} Breakroom Depok. All rights reserved.</p>
          <Link 
            to="/auth" 
            className="inline-block mt-3 py-2 text-xs text-muted-foreground/50 hover:text-primary transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
