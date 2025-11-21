import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import breakroomLogo from "@/assets/breakroom-logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: t('nav.home'), path: "#hero" },
    { name: t('nav.services'), path: "#konsultasi" },
    { name: t('nav.about'), path: "#about" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = path.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const navbarHeight = 64; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={breakroomLogo} alt="Breakroom Depok" className="w-10 h-10 rounded object-cover" />
            <span className="text-xl font-bold text-foreground">Breakroom Depok</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                {link.name}
              </a>
            ))}
            <LanguageSwitcher />
            <Button variant="hero" size="sm" asChild>
              <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer">
                {t('nav.booking')}
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
                onClick={(e) => handleNavClick(e, link.path)}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
            <Button variant="hero" size="sm" className="w-full" asChild>
              <a href="https://wa.me/6282312504723" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                {t('nav.booking')}
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
