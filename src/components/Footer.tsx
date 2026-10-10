import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import atiLogo from "@/assets/ati-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.impact"), path: "/impact" },
    { label: t("nav.getInvolved"), path: "/get-involved" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  const programLinks = [
    { label: t("programs.education"), path: "/programs/education" },
    { label: t("programs.agriculture"), path: "/programs/agriculture" },
    { label: t("programs.entrepreneurship"), path: "/programs/entrepreneurship" },
    { label: t("programs.vocational"), path: "/programs/vocational-training" },
    { label: t("programs.leadership"), path: "/programs/leadership" },
  ];

  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto container-padding">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <img src={atiLogo} alt="Aspire and Thrive Initiative" className="h-24 sm:h-28 w-auto mb-6 drop-shadow-lg" />
            <p className="text-foreground/70 text-sm leading-relaxed">
              {t("footer.mission")}
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-foreground font-serif">
              {t("footer.quickLinks")}
            </h5>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block text-foreground/70 hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-foreground font-serif">
              {t("footer.programs")}
            </h5>
            <nav className="space-y-2">
              {programLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-foreground/70 hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-wider text-foreground font-serif">
              {t("footer.contact")}
            </h5>
            <div className="space-y-3">
              <a href="mailto:contact@aspirehi.org" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors text-sm">
                <Mail className="w-4 h-4" />
                contact@aspirehi.org
              </a>
              <a href="tel:2074002909" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors text-sm">
                <Phone className="w-4 h-4" />
                (207) 400-2909
              </a>
              <div className="flex items-start gap-2 text-foreground/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Bujumbura, Burundi
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/50 text-sm">
              © {currentYear} Aspire and Thrive Initiative. {t("footer.rights")}
            </p>
            <p className="text-foreground/50 text-sm">
              {t("footer.builtBy")}{" "}
              <a
                href="https://www.orductive.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Orductive
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
