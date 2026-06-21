import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import DonateSection from "@/components/DonateSection";
import WhySupportSection from "@/components/WhySupportSection";

const GetInvolvedPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHero title={t("involvedPage.title")} subtitle={t("involvedPage.heroSubtitle")} />
      <GetInvolvedSection />
      <WhySupportSection />
      <DonateSection />
    </>
  );
};

export default GetInvolvedPage;
