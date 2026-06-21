import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lightbulb, Target, CheckCircle, Heart } from "lucide-react";
import PageHero from "@/components/PageHero";
import entrepreneurshipImg from "@/assets/entrepreneurship-hero.jpg";

const EntrepreneurshipPage = () => {
  const { t } = useLanguage();

  const goals = [
    t("entre.goal1"), t("entre.goal2"), t("entre.goal3"), t("entre.goal4"), t("entre.goal5"),
  ];

  return (
    <>
      <PageHero title={t("entre.title")} subtitle={t("entre.heroSubtitle")} />

      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-accent" />
              </div>
              <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
                {t("programPage.aboutProgram")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                {t("entre.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                {t("entre.intro")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("entre.about")}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={entrepreneurshipImg} alt="Woman entrepreneur at her business" className="w-full h-full object-cover min-h-[400px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Target className="lucide lucide-target w-10 h-10 mx-auto mb-4 text-primary" />
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground">
              {t("programPage.goals")}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4">
            {goals.map((goal, i) => (
              <div key={i} className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-sm border border-border">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-accent via-purple-mid to-purple-deep">
        <div className="container mx-auto container-padding text-center">
          <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6">
            {t("donate.title")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-purple-deep hover:bg-white/90 font-bold" asChild>
              <Link to="/donate">{t("programPage.cta.donate")}</Link>
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <Link to="/contact">{t("programPage.cta.contact")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EntrepreneurshipPage;
