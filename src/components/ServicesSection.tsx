import { Button } from "@/components/ui/button";
import { BookOpen, Users, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

import Reveal from "@/components/animations/Reveal";

const ServicesSection = () => {
  const { t } = useLanguage();

  const programs = [
    {
      icon: BookOpen,
      title: t("services.educationTitle"),
      description: t("services.educationDesc"),
      link: "/programs/education",
    },
    {
      icon: Users,
      title: t("services.mentorshipTitle"),
      description: t("services.mentorshipDesc"),
      link: "/programs/leadership",
    },
    {
      icon: Building2,
      title: t("services.communityTitle"),
      description: t("services.communityDesc"),
      link: "/programs/agriculture",
    },
    {
      icon: Building2,
      title: t("services.familyTitle"),
      description: t("services.familyDesc"),
      link: "/programs/vocational-training",
    },
  ];

  return (
    <section id="programs" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 texture-topography" />
      <div className="container mx-auto container-padding relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-sm">
              {t("services.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("services.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("services.subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal staggerChildren={true} className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="bg-card rounded-2xl p-8 shadow-md border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <program.icon className="w-7 h-7 transition-colors duration-300 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                {program.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {program.description}
              </p>
              <Button variant="outline-accent" className="group/btn" asChild>
                <Link to={program.link}>
                  {t("services.learnMore")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};


export default ServicesSection;
