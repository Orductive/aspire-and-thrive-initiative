import { useEffect, useRef, useState } from "react";
import { Users, Globe, Rocket, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading text-4xl lg:text-5xl font-bold text-white">
      {count}{suffix}
    </div>
  );
};

import Reveal from "@/components/animations/Reveal";

const ImpactSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: 500, suffix: "+", label: t("impact.youthSupported") },
    { icon: Globe, value: 12, suffix: "+", label: t("impact.communitiesReached") },
    { icon: Rocket, value: 8, suffix: "", label: t("impact.programsLaunched") },
    { icon: Heart, value: 1000, suffix: "+", label: t("impact.livesImpacted") },
  ];

  return (
    <section id="impact" className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 texture-circles bg-[#a0a9b6]" />
      <div className="container mx-auto container-padding relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
              {t("impact.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {t("impact.title")}
            </h2>
            <p className="text-white/60 text-lg">
              {t("impact.subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal staggerChildren={true} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <stat.icon className="w-10 h-10 text-purple-bright mx-auto mb-4" />
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 text-sm font-medium mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};


export default ImpactSection;
