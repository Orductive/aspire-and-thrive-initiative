import Reveal from "@/components/animations/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import DonateSection from "@/components/DonateSection";
import { Users, Gem, ShieldCheck, Sprout } from "lucide-react";
import founderImg from "@/assets/founder-bertrand.jpg";
import aboutHeroImg from "@/assets/about-hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

import SEO from "@/components/SEO";

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { title: t("aboutPage.value1Title"), desc: t("aboutPage.value1Desc"), icon: Sprout },
    { title: t("aboutPage.value2Title"), desc: t("aboutPage.value2Desc"), icon: Gem },
    { title: t("aboutPage.value3Title"), desc: t("aboutPage.value3Desc"), icon: ShieldCheck },
    { title: t("aboutPage.value4Title"), desc: t("aboutPage.value4Desc"), icon: Sprout },
  ];

  return (
    <>
      <SEO 
        title="About Us | Aspire and Thrive Initiative"
        description="Learn about Aspire and Thrive Initiative's mission, vision, and core values. Discover our story and commitment to empowering youth in Burundi."
      />
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHeroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/95 via-purple-deep/85 to-purple-deep/70" />
        </div>
        <div className="absolute inset-0 texture-dots opacity-[0.03]" />
        <div className="relative z-10 container mx-auto container-padding py-32 lg:py-40 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t("aboutPage.title")}
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            {t("aboutPage.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 texture-grid bg-[#a0a9b6]" />
        <div className="container mx-auto container-padding relative z-10">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
                {t("aboutPage.storyLabel")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                {t("aboutPage.storyTitle")}
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-left">
                <p>{t("aboutPage.storyP1")}</p>
                <p>{t("aboutPage.storyP2")}</p>
              </div>
            </div>
          </Reveal>

          {/* Photo mosaic */}
          <Reveal staggerChildren={true} className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg row-span-2">
              <img src={gallery1} alt="Community program" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg col-span-2">
              <img src={gallery3} alt="Youth in field" className="w-full h-[260px] object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg col-span-2">
              <img src={gallery6} alt="Livestock program" className="w-full h-[260px] object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 texture-topography" />
        <div className="container mx-auto container-padding relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <Reveal className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
                  <img
                    src={founderImg}
                    alt="Bertrand Mizero, Founder of Aspire and Thrive Initiative"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-xl px-5 py-2.5 shadow-lg font-sans font-bold text-sm">
                  {t("aboutPage.founderTag")}
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-3">
              <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
                {t("aboutPage.founderLabel")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-2 leading-tight text-primary-foreground">
                Bertrand Mizero
              </h2>
              <p className="font-medium mb-6 text-primary-foreground">{t("aboutPage.founderRole")}</p>
              <div className="space-y-4 leading-relaxed text-primary-foreground">
                <p>{t("aboutPage.founderP1")}</p>
                <p>{t("aboutPage.founderP2")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 texture-circles bg-[#a0a9b6]" />
        <div className="container mx-auto container-padding relative z-10">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
                {t("aboutPage.missionLabel")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                {t("aboutPage.missionTitle")}
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed text-lg">
                <p>{t("aboutPage.missionP1")}</p>
                <p>{t("aboutPage.missionP2")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 texture-grid bg-[#a0a9b6]" />
        <div className="container mx-auto container-padding relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
                {t("aboutPage.valuesLabel")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {t("aboutPage.valuesTitle")}
              </h2>
            </div>
          </Reveal>
          <Reveal staggerChildren={true} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val) => (
              <div key={val.title} className="bg-card rounded-2xl p-8 text-center shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <val.icon className="w-7 h-7 transition-colors duration-300 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <DonateSection />
    </>
  );
};

export default AboutPage;
