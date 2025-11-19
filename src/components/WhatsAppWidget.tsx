import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "62YOUR_NUMBER"; // Ganti dengan nomor WhatsApp bisnis Anda
  const defaultMessage = "Halo! Saya ingin bertanya tentang Breakroom Depok";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat bubble */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-background border border-border rounded-lg shadow-glow animate-in slide-in-from-bottom-5">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Chat dengan Kami</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 rounded p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Halo! Ada yang bisa kami bantu? 👋
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat via WhatsApp
            </Button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-glow flex items-center justify-center transition-all hover:scale-110 animate-in zoom-in"
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default WhatsAppWidget;
