import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Handshake, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

import Reveal from "@/components/animations/Reveal";

const GetInvolvedSection = () => {
  const { t } = useLanguage();

  const items = [
    {
      icon: Heart,
      title: t("involved.donateTitle"),
      description: t("involved.donateDesc"),
      cta: t("involved.makeGift"),
      href: "/donate",
    },
    {
      icon: Handshake,
      title: t("involved.volunteerTitle"),
      description: t("involved.volunteerDesc"),
      cta: t("involved.joinUs"),
      href: "/volunteer",
    },
    {
      icon: GraduationCap,
      title: t("involved.applyTitle"),
      description: t("involved.applyDesc"),
      cta: t("involved.applyNow"),
      href: "/apply",
    },
  ];

  return (
    <section id="get-involved" className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 texture-dots" />
      <div className="container mx-auto container-padding relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
              {t("involved.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {t("involved.title")}
            </h2>
            <p className="text-white/80 text-lg">
              {t("involved.subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal staggerChildren={true} className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.title} className="bg-card rounded-2xl p-8 text-center shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300">
                <item.icon className="w-8 h-8 transition-colors duration-300 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{item.description}</p>
              <Button variant="outline-accent" asChild>
                <Link to={item.href}>{item.cta}</Link>
              </Button>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
