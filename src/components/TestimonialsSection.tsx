import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import Reveal from "@/components/animations/Reveal";

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      quote: t("testimonials.label") === "Témoignages"
        ? "Le bénévolat avec Aspire and Thrive a été l'une des expériences les plus significatives de ma vie. Voir l'impact direct sur l'éducation des enfants est incroyablement gratifiant."
        : "Volunteering with Aspire and Thrive has been one of the most meaningful experiences of my life. Seeing the direct impact on children's education is incredibly rewarding.",
      name: "Marie Claire",
      role: t("testimonials.label") === "Témoignages" ? "Bénévole & Supportrice de l'éducation" : "Volunteer & Education Supporter",
    },
    {
      quote: t("testimonials.label") === "Témoignages"
        ? "Le programme de mentorat a donné à mon fils la confiance de rêver plus grand. Il parle maintenant de devenir enseignant — quelque chose que nous ne pensions jamais possible."
        : "The mentorship program gave my son the confidence to dream bigger. He now talks about becoming a teacher — something we never thought possible.",
      name: "Jean Pierre",
      role: t("testimonials.label") === "Témoignages" ? "Parent d'un participant au programme" : "Parent of Program Participant",
    },
    {
      quote: t("testimonials.label") === "Témoignages"
        ? "Grâce au programme de formation professionnelle, j'ai appris la couture qui fait maintenant vivre toute ma famille. Aspire and Thrive ne m'a pas seulement enseigné un métier — ils m'ont donné un avenir."
        : "Through the vocational training program, I learned tailoring skills that now support my entire family. Aspire and Thrive didn't just teach me a trade — they gave me a future.",
      name: "Consolate",
      role: t("testimonials.label") === "Témoignages" ? "Diplômée en formation professionnelle" : "Vocational Training Graduate",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 texture-circles bg-[#a0a9b6]" />
      <div className="container mx-auto container-padding relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
              {t("testimonials.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("testimonials.title")}
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="max-w-3xl mx-auto relative">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center min-h-[280px] flex flex-col items-center justify-center shadow-md">
              <Quote className="w-10 h-10 text-primary/50 mb-6" />
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonials[current].quote}"
              </p>
              <div>
                <p className="text-foreground font-heading font-bold text-lg">
                  {testimonials[current].name}
                </p>
                <p className="text-primary text-sm">
                  {testimonials[current].role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};


export default TestimonialsSection;
