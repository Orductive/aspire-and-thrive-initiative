import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/95 via-purple-deep/80 to-purple-deep/60" />
      </div>

      <div className="relative z-10 container mx-auto container-padding py-32 lg:py-40">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
            <Heart className="w-4 h-4 text-purple-bright" />
            <span className="text-sm font-medium text-white/90">{t("hero.badge")}</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            {t("hero.title1")}{" "}
            <span className="text-purple-bright">{t("hero.education")}</span> &{" "}
            <span className="text-purple-bright">{t("hero.opportunity")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/75 mb-10 max-w-2xl leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="accent" size="xl" asChild>
              <Link to="/#programs" className="flex items-center gap-2">
                {t("hero.explorePrograms")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <Link to="/get-involved" className="flex items-center gap-2">
                {t("hero.getInvolved")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-purple-bright rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
