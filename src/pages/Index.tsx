import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedStorySection from "@/components/FeaturedStorySection";
import WhySupportSection from "@/components/WhySupportSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import DonateSection from "@/components/DonateSection";
import ContactSection from "@/components/ContactSection";

import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="Aspire and Thrive Initiative | Empowering Youth & Communities"
        description="Aspire and Thrive Initiative empowers Burundi's youth through education, mentorship, vocational training, and community development programs."
      />
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <ServicesSection />
      <FeaturedStorySection />
      <WhySupportSection />
      <GallerySection />
      <TestimonialsSection />
      <GetInvolvedSection />
      <DonateSection />
      <ContactSection />
    </>
  );
};

export default Index;
