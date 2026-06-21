import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import ImpactSection from "@/components/ImpactSection";
import FeaturedStorySection from "@/components/FeaturedStorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import DonateSection from "@/components/DonateSection";

import SEO from "@/components/SEO";

const ImpactPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title="Our Impact | Aspire and Thrive Initiative"
        description="Explore the real-world impact of the Aspire and Thrive Initiative. See how our programs are changing lives and building stronger communities in Burundi."
      />
      <PageHero title={t("impactPage.title")} subtitle={t("impactPage.heroSubtitle")} />
      <ImpactSection />
      <FeaturedStorySection />
      <GallerySection />
      <TestimonialsSection />
      <DonateSection />
    </>
  );
};

export default ImpactPage;
