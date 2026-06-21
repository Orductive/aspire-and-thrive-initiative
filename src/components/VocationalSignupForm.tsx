import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Wrench, Send, CheckCircle } from "lucide-react";

const COURSES = [
  "Tailoring & Sewing",
  "Carpentry & Woodworking",
  "Masonry & Construction",
  "Welding & Metalwork",
  "Auto Mechanics",
  "Electrical Installation",
  "Plumbing",
  "Hairdressing & Beauty",
  "Culinary Arts & Baking",
  "Computer & ICT Skills",
];

const schema = z.object({
  full_name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  age: z.string().trim().max(3).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  course: z.string().min(1, "Please select a course"),
  experience: z.string().trim().max(500).optional().or(z.literal("")),
  motivation: z.string().trim().min(10, "Please share a few words").max(800),
});

const VocationalSignupForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    experience: "",
    motivation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ ...form, course });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      toast({ title: "Please check the form", description: first, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const motivation = `COURSE: ${parsed.data.course}\n\nMOTIVATION: ${parsed.data.motivation}\n\nEXPERIENCE: ${parsed.data.experience || "—"}`;
      const { error } = await supabase.from("program_applications").insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        age: parsed.data.age ? parseInt(parsed.data.age) : null,
        location: parsed.data.location || null,
        program: `vocational-${parsed.data.course}`,
        motivation,
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Application received", description: "We'll be in touch soon." });
    } catch {
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
    <section id="vocational-signup" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Wrench className="w-7 h-7 text-primary" />
            </div>
            <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
              Enroll Now
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-primary-foreground leading-tight">
              Sign Up for a Vocational Course
            </h2>
            <p className="text-muted-foreground text-lg">
              Pick the trade you'd like to learn and tell us a bit about yourself.
              Our team will reach out with the next steps.
            </p>
          </div>

          {submitted ? (
            <div className="bg-card rounded-2xl p-12 text-center shadow-xl border border-border">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Thank you!
              </h3>
              <p className="text-muted-foreground">
                Your enrollment has been received. We'll contact you about the
                next training intake.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-border space-y-6"
            >
              <div>
                <Label htmlFor="course" className="text-base font-semibold">
                  Which course would you like to take? *
                </Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger id="course" className="mt-2">
                    <SelectValue placeholder="Select a vocational course" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <Input id="age" name="age" type="number" min="14" max="60" value={form.age} onChange={handleChange} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="location">Location (city, country)</Label>
                  <Input id="location" name="location" value={form.location} onChange={handleChange} className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="experience">Prior Experience</Label>
                <p className="text-xs text-muted-foreground mb-1.5">
                  Have you done any related work or training before? (optional)
                </p>
                <Textarea id="experience" name="experience" rows={3} value={form.experience} onChange={handleChange} className="resize-none" />
              </div>

              <div>
                <Label htmlFor="motivation">Why do you want to learn this trade? *</Label>
                <p className="text-xs text-muted-foreground mb-1.5">
                  Tell us about your goals and how this course will help you.
                </p>
                <Textarea id="motivation" name="motivation" required rows={4} value={form.motivation} onChange={handleChange} className="resize-none" />
              </div>

              <Button type="submit" size="lg" variant="accent" disabled={loading} className="w-full">
                {loading ? "Submitting..." : (<>Submit Enrollment <Send className="w-4 h-4 ml-2" /></>)}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default VocationalSignupForm;
