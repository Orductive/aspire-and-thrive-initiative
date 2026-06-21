import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import ServiceMap from "@/components/ServiceMap";

import SEO from "@/components/SEO";

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title="Contact Us | Aspire and Thrive Initiative"
        description="Get in touch with Aspire and Thrive Initiative. We'd love to hear from you regarding partnerships, donations, or any general inquiries."
      />
      <PageHero title={t("contactPage.title")} subtitle={t("contactPage.heroSubtitle")} />
      <ContactSection />
      <ServiceMap />
    </>
  );
};

export default ContactPage;
