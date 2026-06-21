import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import ImpactSection from "@/components/ImpactSection";
import FeaturedStorySection from "@/components/FeaturedStorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import DonateSection from "@/components/DonateSection";

const ImpactPage = () => {
  const { t } = useLanguage();

  return (
    <>
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
