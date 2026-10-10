const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface NotificationBody {
  formType: "program" | "volunteer" | "contact";
  fullName: string;
  email: string;
  details?: string;
}

const getEnv = (key: string): string => {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`${key} is not configured`);
  return value;
};

async function sendEmail(opts: {
  apiKey: string; from: string; to: string; replyTo?: string; subject: string; html: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${opts.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: opts.from, to: opts.to, reply_to: opts.replyTo, subject: opts.subject, html: opts.html,
    }),
  });
  if (!res.ok) { const text = await res.text(); throw new Error(`Resend failed: ${res.status} ${text}`); }
  return res.json();
}

const LABELS: Record<string, string> = {
  program: "Program Application",
  volunteer: "Volunteer Application",
  contact: "Contact Message",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  try {
    const { formType, fullName, email, details } = (await req.json()) as NotificationBody;
    if (!formType || !fullName || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const apiKey = getEnv("RESEND_API_KEY");
    const FROM = "Aspire and Thrive Initiative <onboarding@resend.dev>";
    const STAFF_INBOX = getEnv("NOTIFY_TO");
    const label = LABELS[formType] ?? "Submission";
    const safe = (s: string) =>
      String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));

    await sendEmail({
      apiKey, from: FROM, to: STAFF_INBOX, replyTo: email,
      subject: `New ${label} — Aspire & Thrive`,
      html: `<div style="font-family:system-ui,sans-serif;color:#141414"><h2 style="color:hsl(199,76%,48%)">New ${safe(label)}</h2><p><strong>Name:</strong> ${safe(fullName)}</p><p><strong>Email:</strong> ${safe(email)}</p>${details ? `<p><strong>Details:</strong></p><p style="white-space:pre-wrap">${safe(details)}</p>` : ""}</div>`,
    });

    await sendEmail({
      apiKey, from: FROM, to: email,
      subject: "We received your message — Aspire and Thrive Initiative",
      html: `<div style="font-family:system-ui,sans-serif;color:#141414"><h2 style="color:hsl(199,76%,48%)">Thank you, ${safe(fullName)}</h2><p>We've received your ${safe(label.toLowerCase())} and someone from our team will be in touch soon.</p><p>— The Aspire and Thrive Initiative Team</p><hr style="border:none;border-top:1px solid #eee;margin:16px 0" /><p style="font-size:12px;color:#888">Built by <a href="https://www.orductive.online" style="color:hsl(199,76%,48%)">Orductive</a></p></div>`,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-notification error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
