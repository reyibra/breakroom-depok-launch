import { MapPin, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded flex items-center justify-center font-bold text-primary-foreground text-sm md:text-base">
                BR
              </div>
              <span className="text-lg md:text-xl font-bold">Breakroom Depok</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              Luapkan, Lepaskan & Lupakan Penatmu di stress-release room pertama di Indonesia
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/breakroom.depok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@breakroom.depok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/6282312504723"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm md:text-base font-bold mb-3 md:mb-4 text-foreground">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ruangan
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tentang & Keamanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm md:text-base font-bold mb-3 md:mb-4 text-foreground">Kontak</h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start space-x-2 text-xs md:text-sm text-muted-foreground">
                <MapPin size={14} className="mt-1 flex-shrink-0 text-primary md:w-4 md:h-4" />
                <span>Kelapa Dua, Kota Depok, Jawa Barat</span>
              </li>
              <li className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
                <Phone size={14} className="flex-shrink-0 text-primary md:w-4 md:h-4" />
                <a href="tel:+6282312504723" className="hover:text-primary transition-colors">
                  +62 823-1250-4723
                </a>
              </li>
              <li className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
                <Mail size={14} className="flex-shrink-0 text-primary md:w-4 md:h-4" />
                <a href="mailto:info@breakroom.id" className="hover:text-primary transition-colors">
                  info@breakroom.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Breakroom Depok. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
