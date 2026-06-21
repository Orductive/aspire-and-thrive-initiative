import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

const VolunteerPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    availability: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("volunteer_applications").insert({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        location: formData.location.trim() || null,
        skills: formData.skills.trim() || null,
        availability: formData.availability || null,
        reason: formData.reason.trim(),
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: t("volunteer.successTitle"),
        description: t("volunteer.successDesc"),
      });
    } catch {
      toast({
        title: t("volunteer.errorTitle"),
        description: t("volunteer.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Volunteer With Us | Aspire and Thrive Initiative"
        description="Join Aspire and Thrive Initiative as a volunteer. Share your skills and help empower communities and youth across Burundi."
      />
      <PageHero title={t("volunteer.pageTitle")} subtitle={t("volunteer.pageSubtitle")} />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 texture-grid bg-[#a0a9b6]" />
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-xl border border-border">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    {t("volunteer.successTitle")}
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    {t("volunteer.successDesc")}
                  </p>
                  <Button
                    variant="accent"
                    className="mt-8"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ full_name: "", email: "", phone: "", location: "", skills: "", availability: "", reason: "" });
                    }}
                  >
                    {t("volunteer.submitAnother")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground">
                        {t("volunteer.formTitle")}
                      </h2>
                      <p className="text-muted-foreground text-sm">{t("volunteer.formSubtitle")}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
                          {t("volunteer.fullName")} *
                        </label>
                        <Input
                          id="full_name"
                          name="full_name"
                          required
                          maxLength={100}
                          placeholder={t("volunteer.fullNamePlaceholder")}
                          value={formData.full_name}
                          onChange={handleChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          {t("volunteer.email")} *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={255}
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          {t("volunteer.phone")}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          maxLength={20}
                          placeholder="+257..."
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                          {t("volunteer.location")}
                        </label>
                        <Input
                          id="location"
                          name="location"
                          maxLength={100}
                          placeholder={t("volunteer.locationPlaceholder")}
                          value={formData.location}
                          onChange={handleChange}
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-foreground mb-2">
                        {t("volunteer.skills")}
                      </label>
                      <Input
                        id="skills"
                        name="skills"
                        maxLength={300}
                        placeholder={t("volunteer.skillsPlaceholder")}
                        value={formData.skills}
                        onChange={handleChange}
                        className="bg-secondary/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-foreground mb-2">
                        {t("volunteer.availability")}
                      </label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, availability: value }))}
                      >
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue placeholder={t("volunteer.availabilityPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">{t("volunteer.fullTime")}</SelectItem>
                          <SelectItem value="part-time">{t("volunteer.partTime")}</SelectItem>
                          <SelectItem value="weekends">{t("volunteer.weekends")}</SelectItem>
                          <SelectItem value="remote">{t("volunteer.remote")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-2">
                        {t("volunteer.reason")} *
                      </label>
                      <Textarea
                        id="reason"
                        name="reason"
                        required
                        rows={5}
                        maxLength={2000}
                        placeholder={t("volunteer.reasonPlaceholder")}
                        value={formData.reason}
                        onChange={handleChange}
                        className="bg-secondary/50 resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.reason.length}/2000
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        t("volunteer.submitting")
                      ) : (
                        <>
                          {t("volunteer.submit")}
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VolunteerPage;
