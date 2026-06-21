import { useLanguage } from "@/contexts/LanguageContext";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const images = [
  { src: gallery1, alt: "Children in a colorful classroom with learning materials" },
  { src: gallery2, alt: "Farmer walking through lush green rice fields" },
  { src: gallery3, alt: "Youth learning carpentry and woodworking skills" },
  { src: gallery4, alt: "Youth carrying harvest from the fields" },
  { src: gallery5, alt: "Farmer tending crops on a hillside farm" },
];

import Reveal from "@/components/animations/Reveal";

const GallerySection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto container-padding">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
              {t("gallery.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {t("gallery.title")}
            </h2>
            <p className="text-white/80 text-lg">
              {t("gallery.subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal staggerChildren={true} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl group ${
                index === 0 ? "row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};


export default GallerySection;
