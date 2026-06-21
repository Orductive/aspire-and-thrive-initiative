import { useLanguage } from "@/contexts/LanguageContext";
import storyImg from "@/assets/story-featured.jpg";

import Reveal from "@/components/animations/Reveal";

const FeaturedStorySection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        <Reveal className="relative">
          <img
            src={storyImg}
            alt="Young girl reading a book under a tree"
            className="w-full h-full object-cover min-h-[400px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-deep/20 lg:bg-none" />
        </Reveal>

        <Reveal className="bg-secondary flex items-center">
          <div className="px-8 lg:px-16 py-16 max-w-xl">
            <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
              {t("story.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {t("story.title")}
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
            </div>
            <div className="mt-8">
              <p className="text-white font-semibold">{t("story.name")}</p>
              <p className="text-white/50 text-sm">{t("story.role")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedStorySection;
