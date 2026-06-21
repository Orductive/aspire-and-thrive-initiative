import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import DonateSection from "@/components/DonateSection";
import WhySupportSection from "@/components/WhySupportSection";

import SEO from "@/components/SEO";

const GetInvolvedPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title="Get Involved | Aspire and Thrive Initiative"
        description="Join Aspire and Thrive Initiative in empowering Burundi's youth. Discover opportunities to volunteer, partner with us, and make a lasting difference."
      />
      <PageHero title={t("involvedPage.title")} subtitle={t("involvedPage.heroSubtitle")} />
      <GetInvolvedSection />
      <WhySupportSection />
      <DonateSection />
    </>
  );
};

export default GetInvolvedPage;
