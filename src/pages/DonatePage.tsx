import { useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Heart, BookOpen, Sprout, Users, GraduationCap, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

const IMPACT_ITEMS = [
  { icon: BookOpen, amount: 25, label: "Provides school supplies for one student" },
  { icon: Sprout, amount: 50, label: "Funds seeds & tools for a young farmer" },
  { icon: GraduationCap, amount: 100, label: "Sponsors a month of vocational training" },
  { icon: Users, amount: 250, label: "Supports a community mentorship workshop" },
];

const DonatePage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [email, setEmail] = useState("");
  const [donorName, setDonorName] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const finalAmount = customAmount
    ? parseFloat(customAmount)
    : selectedAmount ?? 0;

  const handleStartCheckout = async () => {
    if (!finalAmount || finalAmount < 1) {
      toast({
        title: "Please choose an amount",
        description: "Donation must be at least $1.00",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: {
          amountInCents: Math.round(finalAmount * 100),
          customerEmail: email || undefined,
          donorName: donorName || undefined,
          returnUrl: `${window.location.origin}/donate/return?session_id={CHECKOUT_SESSION_ID}`,
          environment: getStripeEnvironment(),
          frequency,
        },
      });
      if (error || !data?.clientSecret) {
        throw new Error(error?.message || "Failed to start checkout");
      }
      setClientSecret(data.clientSecret);
      setTimeout(() => {
        document.getElementById("checkout-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      toast({
        title: "Could not start checkout",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetCheckout = () => setClientSecret(null);

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />

      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background py-12 sm:py-16">
        <div className="absolute inset-0 texture-dots opacity-10" />
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-background/20 mb-6 text-sm">
              <Heart className="w-4 h-4" />
              {t("nav.donate")}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your gift becomes a future.
            </h1>
            <p className="text-lg sm:text-xl text-background/80 leading-relaxed max-w-2xl">
              Every contribution directly funds education, mentorship, and vocational programs for youth across Burundi. 100% of donations stay close to the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Donation form */}
            <div className="lg:col-span-3">
              {!clientSecret ? (
                <Card className="p-6 sm:p-8 border-2">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                    Choose your contribution
                  </h2>

                  {/* Frequency toggle */}
                  <div className="inline-flex p-1 rounded-full bg-muted mb-8">
                    <button
                      onClick={() => setFrequency("one_time")}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                        frequency === "one_time"
                          ? "bg-foreground text-background shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      onClick={() => setFrequency("monthly")}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                        frequency === "monthly"
                          ? "bg-foreground text-background shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>

                  {/* Preset amounts */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                    {PRESET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`py-4 rounded-lg font-bold text-lg border-2 transition-all ${
                          selectedAmount === amount && !customAmount
                            ? "border-foreground bg-foreground text-background shadow-md"
                            : "border-border bg-background text-foreground hover:border-foreground/50"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="mb-8">
                    <Label htmlFor="custom" className="text-sm font-medium mb-2 block">
                      Or enter a custom amount
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                        $
                      </span>
                      <Input
                        id="custom"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="0"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="pl-8 h-12 text-lg font-semibold"
                      />
                    </div>
                  </div>

                  {/* Donor info */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                        Name (optional)
                      </Label>
                      <Input
                        id="name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Your name"
                        className="h-11"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                        Email (optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleStartCheckout}
                    disabled={loading || !finalAmount}
                    size="xl"
                    className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold text-lg shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Preparing checkout…
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
                        Donate ${finalAmount || 0}
                        {frequency === "monthly" && " / month"}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4" />
                    Secure payment powered by Stripe
                  </div>
                </Card>
              ) : (
                <Card id="checkout-section" className="p-4 sm:p-6 border-2">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-xl font-bold text-foreground">
                      Complete your donation
                    </h2>
                    <Button variant="ghost" size="sm" onClick={resetCheckout}>
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Change amount
                    </Button>
                  </div>
                  <div id="checkout">
                    <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  </div>
                </Card>
              )}
            </div>

            {/* Impact sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Your impact
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  See where your contribution goes.
                </p>
              </div>
              <div className="space-y-3">
                {IMPACT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.amount}
                      onClick={() => {
                        setSelectedAmount(item.amount);
                        setCustomAmount("");
                      }}
                      className="w-full text-left flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-foreground/50 hover:bg-muted/50 transition-all"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">${item.amount}</div>
                        <div className="text-sm text-muted-foreground leading-snug">
                          {item.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <Card className="p-6 bg-muted/40 border-dashed">
                <h4 className="font-heading font-bold text-foreground mb-2">Other ways to give</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Want to partner with us, sponsor a program, or contribute in-kind? We'd love to hear from you.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/contact">Contact our team</a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
