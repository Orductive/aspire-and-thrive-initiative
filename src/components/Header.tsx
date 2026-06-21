import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import atiLogo from "@/assets/ati-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProgramsOpen(false);
    setMobileProgramsOpen(false);
  }, [location.pathname]);

  const programLinks = [
    { label: t("programs.education"), path: "/programs/education" },
    { label: t("programs.agriculture"), path: "/programs/agriculture" },
    { label: t("programs.entrepreneurship"), path: "/programs/entrepreneurship" },
    { label: t("programs.vocational"), path: "/programs/vocational-training" },
    { label: t("programs.leadership"), path: "/programs/leadership" },
  ];

  const navLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.programs"), path: "#", dropdown: true },
    { label: t("nav.impact"), path: "/impact" },
    { label: t("nav.getInvolved"), path: "/get-involved" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md shadow-lg bg-secondary"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={atiLogo} alt="Aspire and Thrive Initiative" className="h-12 sm:h-14 w-auto drop-shadow-lg" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setProgramsOpen(true)}
                  onMouseLeave={() => setProgramsOpen(false)}
                >
                  <button
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1"
                    onClick={() => setProgramsOpen(!programsOpen)}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${programsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {programsOpen && (
                    <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in">
                      <div className="bg-secondary/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 overflow-hidden py-2">
                        {programLinks.map((prog) => (
                          <Link
                            key={prog.path}
                            to={prog.path}
                            className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            {prog.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-purple-bright after:transition-all after:duration-300 hover:after:w-full ${
                    location.pathname === link.path
                      ? "text-white after:w-full"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Language toggle + CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-sm rounded-full border border-white/10 p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  language === "en"
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  language === "fr"
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                FR
              </button>
            </div>

            <Button variant="accent" size="default" className="hidden sm:inline-flex" asChild>
              <Link to="/donate">{t("nav.donate")}</Link>
            </Button>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden bg-secondary/98 backdrop-blur-md border-t border-white/10 py-6 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                      className="flex items-center justify-between w-full text-white/80 hover:text-white px-4 py-3 text-base font-medium transition-colors"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProgramsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileProgramsOpen && (
                      <div className="pl-6 pb-2 space-y-1">
                        {programLinks.map((prog) => (
                          <Link
                            key={prog.path}
                            to={prog.path}
                            className="block px-4 py-2 text-sm transition-colors text-primary"
                          >
                            {prog.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`px-4 py-3 text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              {/* Mobile Language Toggle */}
              <div className="flex items-center gap-2 px-4 py-3">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    language === "en"
                      ? "bg-accent text-accent-foreground"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    language === "fr"
                      ? "bg-accent text-accent-foreground"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  FRANÇAIS
                </button>
              </div>
              <div className="px-4 pt-2">
                <Button variant="accent" className="w-full" asChild>
                  <Link to="/donate">{t("nav.donate")}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
