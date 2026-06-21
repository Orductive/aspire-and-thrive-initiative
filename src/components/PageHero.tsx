import heroBg from "@/assets/hero-bg.jpg";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/95 via-purple-deep/85 to-purple-deep/70" />
      </div>
      <div className="relative z-10 container mx-auto container-padding py-32 lg:py-40 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
