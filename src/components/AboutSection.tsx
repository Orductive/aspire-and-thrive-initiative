import { useLanguage } from "@/contexts/LanguageContext";
import aboutImg from "@/assets/about-community.jpg";
import Reveal from "@/components/animations/Reveal";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutImg}
                  alt="Youth mentorship program in session"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-xl px-6 py-3 shadow-lg font-sans font-semibold text-sm hidden sm:block">
                Since 2024
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
                {t("about.label")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t("about.title")}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p>{t("about.p3")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
