import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const confirmationRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    { icon: Mail, label: t("contact.email"), value: "contact@aspirehi.org", href: "mailto:contact@aspirehi.org" },
    { icon: Phone, label: t("contact.phone"), value: "(207) 400-2909", href: "tel:2074002909" },
    { icon: MapPin, label: t("contact.location"), value: t("contact.locationValue"), href: "#" },
  ];

  useEffect(() => {
    if (isSubmitted && confirmationRef.current) {
      const offset = 80;
      const pos = confirmationRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast({ title: t("contact.thankYou"), description: t("contact.teamReply") });
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(false);
      }, 5000);
    } catch {
      toast({ title: t("contact.thankYou"), description: t("contact.teamReply") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 texture-grid bg-[#a0a9b6]" />
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
            {t("contact.label")}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4 leading-tight">
            {t("contact.title")}
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
              {t("contact.sendMessage")}
            </h3>
            
            {isSubmitted ? (
              <div ref={confirmationRef} className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-accent mb-4" />
                <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                  {t("contact.thankYou")}
                </h4>
                <p className="text-muted-foreground">{t("contact.teamReply")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.fullName")} *
                  </label>
                  <Input id="name" name="name" required placeholder={t("contact.yourName")} value={formData.name} onChange={handleChange} className="bg-secondary/50" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.emailAddress")} *
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange} className="bg-secondary/50" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.yourMessage")} *
                  </label>
                  <Textarea id="message" name="message" required rows={4} placeholder={t("contact.messagePlaceholder")} value={formData.message} onChange={handleChange} className="bg-secondary/50 resize-none" />
                </div>
                <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.sending") : (<>{t("contact.send")} <Send className="w-4 h-4 ml-2" /></>)}
                </Button>
              </form>
            )}
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-6">
              {t("contact.info")}
            </h3>
            <p className="text-secondary-foreground/70 mb-8 leading-relaxed">
              {t("contact.infoDesc")}
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 p-4 rounded-xl"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-foreground/60">{item.label}</p>
                    <p className="text-secondary-foreground font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
