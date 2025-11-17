import { MapPin, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center font-bold text-primary-foreground">
                BR
              </div>
              <span className="text-xl font-bold">Breakroom Depok</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Link Cepat</h3>
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
            <h3 className="font-bold mb-4 text-foreground">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-primary" />
                <span>Kelapa Dua, Kota Depok, Jawa Barat</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone size={16} className="flex-shrink-0 text-primary" />
                <a href="tel:+628123456789" className="hover:text-primary transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail size={16} className="flex-shrink-0 text-primary" />
                <a href="mailto:info@breakroom.id" className="hover:text-primary transition-colors">
                  info@breakroom.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Breakroom Depok. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
