import { Button } from "@/components/ui/button";
import { Heart, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const DonateSection = () => {
  const { t } = useLanguage();

  return (
    <section id="donate" className="py-12 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 texture-dots opacity-50" />

      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <Heart className="w-12 h-12 mx-auto mb-6 text-destructive" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {t("donate.title")}
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            {t("donate.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold" asChild>
              <Link to="/donate" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {t("donate.donateNow")}
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <Handshake className="w-5 h-5" />
                {t("donate.partnerWithUs")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
