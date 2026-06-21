import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const schema = z.object({
  full_name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  age: z.string().trim().max(3).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  program: z.enum(["scholarship", "mentorship"]),
  vision: z.string().trim().min(10, "Please share a few words").max(800),
  interests: z.string().trim().max(500).optional().or(z.literal("")),
});

const EducationSignupForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<"scholarship" | "mentorship">("scholarship");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    vision: "",
    interests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ ...form, program });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      toast({ title: "Please check the form", description: first, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const motivation = `VISION: ${parsed.data.vision}\n\nINTERESTS: ${parsed.data.interests || "—"}`;
      const { error } = await supabase.from("program_applications").insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        age: parsed.data.age ? parseInt(parsed.data.age) : null,
        location: parsed.data.location || null,
        program: `education-${parsed.data.program}`,
        motivation,
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Application received", description: "We'll be in touch soon." });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="education-signup" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
              Apply Now
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground leading-tight">
              Join Our Education Program
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you're seeking a scholarship or mentorship, tell us about
              yourself and your goals — we'd love to support your journey.
            </p>
          </div>

          {submitted ? (
            <div className="bg-card rounded-2xl p-12 text-center shadow-xl border border-border">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Thank you!
              </h3>
              <p className="text-muted-foreground">
                Your application has been received. Our team will review it and
                reach out to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-border space-y-6"
            >
              {/* Program choice */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Which program are you applying to? *
                </Label>
                <RadioGroup
                  value={program}
                  onValueChange={(v) => setProgram(v as "scholarship" | "mentorship")}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  {[
                    { value: "scholarship", label: "Scholarship Program", desc: "Financial support for school fees & supplies" },
                    { value: "mentorship", label: "Mentorship Program", desc: "1-on-1 guidance from experienced mentors" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      htmlFor={opt.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        program === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={opt.value} className="mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">{opt.label}</p>
                        <p className="text-sm text-muted-foreground">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" name="full_name" required value={form.full_name} onChange={handleChange} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={handleChange} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" type="number" min="5" max="99" value={form.age} onChange={handleChange} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="location">Location (city, country)</Label>
                  <Input id="location" name="location" value={form.location} onChange={handleChange} className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="vision">Your Vision *</Label>
                <p className="text-xs text-muted-foreground mb-1.5">
                  What are your dreams or goals? What do you hope to achieve through this program?
                </p>
                <Textarea id="vision" name="vision" required rows={4} value={form.vision} onChange={handleChange} className="resize-none" />
              </div>

              <div>
                <Label htmlFor="interests">Your Interests</Label>
                <p className="text-xs text-muted-foreground mb-1.5">
                  What subjects, careers, or activities are you passionate about?
                </p>
                <Textarea id="interests" name="interests" rows={3} value={form.interests} onChange={handleChange} className="resize-none" />
              </div>

              <Button type="submit" size="lg" variant="accent" disabled={loading} className="w-full">
                {loading ? "Submitting..." : (<>Submit Application <Send className="w-4 h-4 ml-2" /></>)}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSignupForm;
