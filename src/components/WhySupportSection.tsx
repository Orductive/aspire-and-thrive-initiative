import { Heart, Users, Target, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import Reveal from "@/components/animations/Reveal";

const WhySupportSection = () => {
  const { t } = useLanguage();

  const reasons = [
    { icon: Users, title: t("why.communityDriven"), description: t("why.communityDrivenDesc") },
    { icon: Heart, title: t("why.youthFocused"), description: t("why.youthFocusedDesc") },
    { icon: Target, title: t("why.sustainableImpact"), description: t("why.sustainableImpactDesc") },
    { icon: Handshake, title: t("why.partnershipBased"), description: t("why.partnershipBasedDesc") },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 texture-diagonal" />
      <div className="container mx-auto container-padding relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-sm">
              {t("why.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("why.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("why.subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal staggerChildren={true} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center group">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <reason.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};


export default WhySupportSection;
