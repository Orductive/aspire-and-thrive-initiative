import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Brand colors from David's site
const BRAND = {
  gold: "#D4A84B",      // hsl(38, 85%, 55%)
  goldLight: "#E6C88A", // hsl(40, 70%, 75%)
  navy: "#1F2D47",      // hsl(220, 40%, 20%)
  cream: "#FAF8F5",     // hsl(40, 33%, 98%)
  text: "#1C2639",      // hsl(220, 25%, 15%)
  mutedText: "#6B7280",
};

// KW Logo URL (publicly hosted)
const KW_LOGO_URL = "https://djsaili.lovable.app/kw-logo.png";

// Office address
const OFFICE_ADDRESS = "50 Sewall St, Portland, ME 04103";

interface ConsultationRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Email template for David (notification)
function getDavidNotificationEmail(data: ConsultationRequest): string {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.cream}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${BRAND.cream}; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND.navy} 0%, #2A3B5C 100%); padding: 30px 40px; border-radius: 16px 16px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${KW_LOGO_URL}" alt="Keller Williams logo" height="32" style="height: 32px; width: auto; display: block; margin-bottom: 8px;" />
                    <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0 0 16px 0;">Powered by Keller Williams</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1 style="color: ${BRAND.gold}; margin: 0; font-size: 24px; font-weight: 600;">
                      New Consultation Request
                    </h1>
                    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">
                      ${timestamp}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;">
              <!-- Name -->
              <div style="margin-bottom: 24px;">
                <p style="color: ${BRAND.mutedText}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">
                  Full Name
                </p>
                <p style="color: ${BRAND.text}; font-size: 18px; font-weight: 600; margin: 0;">
                  ${escapeHtml(data.name)}
                </p>
              </div>
              
              <!-- Email -->
              <div style="margin-bottom: 24px;">
                <p style="color: ${BRAND.mutedText}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">
                  Email Address
                </p>
                <p style="color: ${BRAND.text}; font-size: 16px; margin: 0;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color: ${BRAND.navy}; text-decoration: none;">
                    ${escapeHtml(data.email)}
                  </a>
                </p>
              </div>
              
              <!-- Phone -->
              ${data.phone ? `
              <div style="margin-bottom: 24px;">
                <p style="color: ${BRAND.mutedText}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">
                  Phone Number
                </p>
                <p style="color: ${BRAND.text}; font-size: 16px; margin: 0;">
                  <a href="tel:${escapeHtml(data.phone.replace(/\D/g, ''))}" style="color: ${BRAND.navy}; text-decoration: none;">
                    ${escapeHtml(data.phone)}
                  </a>
                </p>
              </div>
              ` : ''}
              
              <!-- Message -->
              <div style="margin-bottom: 24px;">
                <p style="color: ${BRAND.mutedText}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">
                  Message
                </p>
                <div style="background-color: ${BRAND.cream}; padding: 16px; border-radius: 8px; border-left: 4px solid ${BRAND.gold};">
                  <p style="color: ${BRAND.text}; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">
${escapeHtml(data.message)}
                  </p>
                </div>
              </div>
              
              <!-- Quick Actions -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E5E7EB;">
                <p style="color: ${BRAND.mutedText}; font-size: 13px; margin: 0 0 12px 0;">Quick Actions:</p>
                <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your Consultation Request" 
                   style="display: inline-block; background-color: ${BRAND.gold}; color: ${BRAND.navy}; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-right: 12px;">
                  Reply to ${escapeHtml(data.name.split(' ')[0])}
                </a>
                ${data.phone ? `
                <a href="tel:${escapeHtml(data.phone.replace(/\D/g, ''))}" 
                   style="display: inline-block; background-color: ${BRAND.navy}; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  Call Now
                </a>
                ` : ''}
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 24px 40px; border-radius: 0 0 16px 16px; border: 1px solid #E5E7EB; border-top: none;">
              <p style="color: ${BRAND.mutedText}; font-size: 12px; margin: 0 0 12px 0; text-align: center;">
                This notification was sent from your website contact form.
              </p>
              <p style="color: #9CA3AF; font-size: 11px; margin: 0; text-align: center;">
                Site built by <a href="https://www.orductive.online" target="_blank" rel="noopener noreferrer" style="color: #9CA3AF; text-decoration: underline;">Orductive</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Email template for the lead (thank you)
function getLeadThankYouEmail(data: ConsultationRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.cream}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${BRAND.cream}; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header with KW logo and accent bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, ${BRAND.gold} 0%, ${BRAND.goldLight} 100%); border-radius: 16px 16px 0 0;"></td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; padding: 24px 40px 0 40px; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;">
              <img src="${KW_LOGO_URL}" alt="Keller Williams logo" height="36" style="height: 36px; width: auto; display: block;" />
              <p style="color: ${BRAND.mutedText}; font-size: 11px; margin: 6px 0 0 0;">Powered by Keller Williams</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;">
              <!-- Greeting -->
              <h1 style="color: ${BRAND.navy}; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
                Thanks, ${escapeHtml(data.name.split(' ')[0])}!
              </h1>
              <p style="color: ${BRAND.mutedText}; font-size: 16px; margin: 0 0 24px 0;">
                Your consultation request has been received.
              </p>
              
              <!-- Confirmation message -->
              <div style="background-color: ${BRAND.cream}; padding: 24px; border-radius: 12px; margin-bottom: 32px;">
                <p style="color: ${BRAND.text}; font-size: 16px; line-height: 1.6; margin: 0;">
                  I've received your message and will be in touch shortly to discuss your real estate needs. 
                  Whether you're buying, selling, or exploring investment opportunities, I'm here to help guide you every step of the way.
                </p>
              </div>
              
              <!-- What's Next -->
              <h2 style="color: ${BRAND.navy}; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                What happens next?
              </h2>
              <ul style="color: ${BRAND.text}; font-size: 15px; line-height: 1.8; padding-left: 20px; margin: 0 0 32px 0;">
                <li>I'll review your request within 24 hours</li>
                <li>We'll schedule a convenient time to connect</li>
                <li>I'll prepare personalized recommendations based on your goals</li>
              </ul>
              
              <!-- Urgent Contact -->
              <div style="background: linear-gradient(135deg, ${BRAND.navy} 0%, #2A3B5C 100%); padding: 24px; border-radius: 12px;">
                <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 12px 0;">
                  Need to reach me sooner? Feel free to call or text:
                </p>
                <a href="tel:2074136387" style="color: ${BRAND.gold}; font-size: 20px; font-weight: 600; text-decoration: none;">
                  (207) 413-6387
                </a>
              </div>
            </td>
          </tr>
          <!-- Contact Info Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 32px 40px; border: 1px solid #E5E7EB; border-top: none;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="color: ${BRAND.navy}; font-size: 18px; font-weight: 700; margin: 0 0 4px 0;">
                      David Saili
                    </p>
                    <p style="color: ${BRAND.gold}; font-size: 14px; font-weight: 500; margin: 0 0 16px 0;">
                      Keller Williams Realty
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="color: ${BRAND.mutedText}; font-size: 14px; line-height: 1.8; margin: 0;">
                      <a href="mailto:djsaili@kw.com" style="color: ${BRAND.navy}; text-decoration: none;">djsaili@kw.com</a><br>
                      <a href="tel:2074136387" style="color: ${BRAND.navy}; text-decoration: none;">(207) 413-6387</a><br>
                      ${OFFICE_ADDRESS}<br>
                      Monday – Friday, 9:00 AM – 5:00 PM
                    </p>
                      Monday – Friday, 9:00 AM – 5:00 PM
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Bottom accent bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, ${BRAND.gold} 0%, ${BRAND.goldLight} 100%);"></td>
          </tr>
          <!-- Orductive credit -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 16px 40px; border-radius: 0 0 16px 16px; border: 1px solid #E5E7EB; border-top: none;">
              <p style="color: #9CA3AF; font-size: 11px; margin: 0; text-align: center;">
                Site built by <a href="https://www.orductive.online" target="_blank" rel="noopener noreferrer" style="color: #9CA3AF; text-decoration: underline;">Orductive</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Plain text version for thank you email
function getLeadThankYouPlainText(data: ConsultationRequest): string {
  return `
Thanks, ${data.name.split(' ')[0]}!

Your consultation request has been received.

I've received your message and will be in touch shortly to discuss your real estate needs. Whether you're buying, selling, or exploring investment opportunities, I'm here to help guide you every step of the way.

What happens next?
- I'll review your request within 24 hours
- We'll schedule a convenient time to connect
- I'll prepare personalized recommendations based on your goals

Need to reach me sooner? Feel free to call or text: (207) 413-6387

---

David Saili
Keller Williams Realty

djsaili@kw.com
(207) 413-6387
${OFFICE_ADDRESS}
Monday – Friday, 9:00 AM – 5:00 PM
  `.trim();
}

// Plain text version for David notification
function getDavidNotificationPlainText(data: ConsultationRequest): string {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
NEW CONSULTATION REQUEST
${timestamp}

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}

Message:
${data.message}
  `.trim();
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ConsultationRequest = await req.json();

    // Server-side validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
      throw new Error("Valid email is required");
    }
    if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
      throw new Error("Message is required");
    }

    // Sanitize and limit input lengths
    const sanitizedData: ConsultationRequest = {
      name: data.name.trim().slice(0, 100),
      email: data.email.trim().toLowerCase().slice(0, 255),
      phone: data.phone ? data.phone.trim().slice(0, 20) : undefined,
      message: data.message.trim().slice(0, 2000),
    };

    const emailResults = {
      davidEmail: { success: false, error: null as string | null },
      leadEmail: { success: false, error: null as string | null },
    };

    // Send notification to David
    try {
      const davidResponse = await resend.emails.send({
        from: "David Saili Website <notifications@djsaili.com>",
        reply_to: "djsaili@kw.com",
        to: ["djsaili@kw.com"],
        subject: `New Consultation Request — ${sanitizedData.name}`,
        html: getDavidNotificationEmail(sanitizedData),
        text: getDavidNotificationPlainText(sanitizedData),
      });
      
      if (davidResponse.error) {
        throw new Error(davidResponse.error.message);
      }
      emailResults.davidEmail.success = true;
      console.log("Notification email sent to David:", davidResponse);
    } catch (error: any) {
      emailResults.davidEmail.error = error.message;
      console.error("Failed to send notification to David:", error);
    }

    // Send thank-you email to the lead (only if valid email)
    if (isValidEmail(sanitizedData.email)) {
      try {
        const leadResponse = await resend.emails.send({
          from: "David Saili <hello@djsaili.com>",
          reply_to: "djsaili@kw.com",
          to: [sanitizedData.email],
          subject: "Thanks — we received your request",
          html: getLeadThankYouEmail(sanitizedData),
          text: getLeadThankYouPlainText(sanitizedData),
        });

        if (leadResponse.error) {
          throw new Error(leadResponse.error.message);
        }
        emailResults.leadEmail.success = true;
        console.log("Thank you email sent to lead:", leadResponse);
      } catch (error: any) {
        emailResults.leadEmail.error = error.message;
        console.error("Failed to send thank you email:", error);
      }
    }

    // Return success even if email sending fails (graceful degradation)
    return new Response(
      JSON.stringify({
        success: true,
        message: "Consultation request received",
        emailResults,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-consultation-email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to process request",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
