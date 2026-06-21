import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import ServiceMap from "@/components/ServiceMap";

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHero title={t("contactPage.title")} subtitle={t("contactPage.heroSubtitle")} />
      <ContactSection />
      <ServiceMap />
    </>
  );
};

export default ContactPage;
