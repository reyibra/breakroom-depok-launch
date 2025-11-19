import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Beranda", path: "#hero" },
    { name: "Layanan", path: "#konsultasi" },
    { name: "Tentang & Keamanan", path: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center font-bold text-primary-foreground">
              BR
            </div>
            <span className="text-xl font-bold text-foreground">Breakroom Depok</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                {link.name}
              </a>
            ))}
            <Button variant="hero" size="sm" asChild>
              <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer">
                Booking Sekarang
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button variant="hero" size="sm" className="w-full" asChild>
              <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                Booking Sekarang
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
