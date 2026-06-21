import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface DonationBody {
  amountInCents: number;
  customerEmail?: string;
  donorName?: string;
  returnUrl: string;
  environment: StripeEnv;
  frequency?: "one_time" | "monthly";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as DonationBody;
    const { amountInCents, customerEmail, donorName, returnUrl, environment, frequency } = body;

    if (!amountInCents || amountInCents < 100) {
      return new Response(JSON.stringify({ error: "Donation must be at least $1.00" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (amountInCents > 99999900) {
      return new Response(JSON.stringify({ error: "Donation amount too large" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!returnUrl || !environment) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = createStripeClient(environment);
    const isMonthly = frequency === "monthly";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: isMonthly
                ? "Monthly Donation — Aspire & Thrive Initiative"
                : "Donation — Aspire & Thrive Initiative",
              description:
                "Your contribution supports youth empowerment programs in Burundi: education, mentorship, vocational training, and community development.",
            },
            unit_amount: amountInCents,
            ...(isMonthly && { recurring: { interval: "month" as const } }),
          },
          quantity: 1,
        },
      ],
      mode: isMonthly ? "subscription" : "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      ...(customerEmail && { customer_email: customerEmail }),
      metadata: {
        type: "donation",
        frequency: isMonthly ? "monthly" : "one_time",
        ...(donorName && { donorName }),
      },
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("create-donation-checkout error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
