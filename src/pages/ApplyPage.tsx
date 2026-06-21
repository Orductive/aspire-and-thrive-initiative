import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

const programs = [
  { value: "education", labelKey: "programs.education" },
  { value: "agriculture", labelKey: "programs.agriculture" },
  { value: "entrepreneurship", labelKey: "programs.entrepreneurship" },
  { value: "vocational-training", labelKey: "programs.vocational" },
  { value: "leadership", labelKey: "programs.leadership" },
];

const ApplyPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    program: "",
    motivation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("program_applications").insert({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        age: formData.age ? parseInt(formData.age, 10) : null,
        location: formData.location.trim() || null,
        program: formData.program,
        motivation: formData.motivation.trim(),
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: t("apply.successTitle"),
        description: t("apply.successDesc"),
      });
    } catch {
      toast({
        title: t("apply.errorTitle"),
        description: t("apply.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Apply to a Program | Aspire and Thrive Initiative"
        description="Submit your application for Aspire and Thrive Initiative programs in education, agriculture, entrepreneurship, vocational training, or leadership."
      />
      <PageHero title={t("apply.pageTitle")} subtitle={t("apply.pageSubtitle")} />

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
                    {t("apply.successTitle")}
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    {t("apply.successDesc")}
                  </p>
                  <Button
                    variant="accent"
                    className="mt-8"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ full_name: "", email: "", phone: "", age: "", location: "", program: "", motivation: "" });
                    }}
                  >
                    {t("apply.submitAnother")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground">
                        {t("apply.formTitle")}
                      </h2>
                      <p className="text-muted-foreground text-sm">{t("apply.formSubtitle")}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
                          {t("apply.fullName")} *
                        </label>
                        <Input
                          id="full_name"
                          name="full_name"
                          required
                          maxLength={100}
                          placeholder={t("apply.fullNamePlaceholder")}
                          value={formData.full_name}
                          onChange={handleChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          {t("apply.email")} *
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

                    <div className="grid sm:grid-cols-3 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          {t("apply.phone")}
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
                        <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">
                          {t("apply.age")}
                        </label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min={10}
                          max={99}
                          placeholder="18"
                          value={formData.age}
                          onChange={handleChange}
                          className="bg-secondary/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                          {t("apply.location")}
                        </label>
                        <Input
                          id="location"
                          name="location"
                          maxLength={100}
                          placeholder={t("apply.locationPlaceholder")}
                          value={formData.location}
                          onChange={handleChange}
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="program" className="block text-sm font-medium text-foreground mb-2">
                        {t("apply.program")} *
                      </label>
                      <Select
                        value={formData.program}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, program: value }))}
                        required
                      >
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue placeholder={t("apply.programPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {t(p.labelKey)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="motivation" className="block text-sm font-medium text-foreground mb-2">
                        {t("apply.motivation")} *
                      </label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        required
                        rows={5}
                        maxLength={2000}
                        placeholder={t("apply.motivationPlaceholder")}
                        value={formData.motivation}
                        onChange={handleChange}
                        className="bg-secondary/50 resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.motivation.length}/2000
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting || !formData.program}
                    >
                      {isSubmitting ? (
                        t("apply.submitting")
                      ) : (
                        <>
                          {t("apply.submit")}
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

export default ApplyPage;
