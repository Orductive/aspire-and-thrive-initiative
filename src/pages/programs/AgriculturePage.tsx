import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Target, CheckCircle, Heart } from "lucide-react";
import PageHero from "@/components/PageHero";
import agricultureImg from "@/assets/agriculture-hero.jpg";

const AgriculturePage = () => {
  const { t } = useLanguage();

  const goals = [
    t("agri.goal1"), t("agri.goal2"), t("agri.goal3"), t("agri.goal4"), t("agri.goal5"),
  ];

  return (
    <>
      <PageHero title={t("agri.title")} subtitle={t("agri.heroSubtitle")} />

      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl">
              <img src={agricultureImg} alt="Farmer tending crops in Burundi" className="w-full h-full object-cover min-h-[400px]" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-7 h-7 text-accent" />
              </div>
              <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
                {t("programPage.aboutProgram")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                {t("agri.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                {t("agri.intro")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("agri.about")}
              </p>
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
              <Link to="/contact">{t("programPage.cta.partner")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AgriculturePage;
