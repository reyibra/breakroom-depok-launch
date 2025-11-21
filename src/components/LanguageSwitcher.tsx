import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
      className="gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'id' ? 'EN' : 'ID'}</span>
    </Button>
  );
};
