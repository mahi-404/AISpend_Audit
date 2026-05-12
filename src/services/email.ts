import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

/**
 * Sends a confirmation email to the lead.
 */
export async function sendLeadConfirmationEmail(email: string, name: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key missing. Email not sent.");
      return;
    }

    await resend.emails.send({
      from: "AI Spend Audit <notifications@yourdomain.com>",
      to: email,
      subject: "Your AI Spend Audit Roadmap is Ready!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #7c3aed;">Hello ${name},</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #475569;">
            Thank you for requesting a professional AI spend audit roadmap. We've received your details and our team at Credex is reviewing your data.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #475569;">
            In the meantime, you can access your personalized report here: 
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/audit" style="color: #7c3aed; font-weight: bold; text-decoration: none;">View Roadmap</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 14px; color: #94a3b8;">
            Best regards,<br />
            The Credex Team
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Email sending error:", error);
  }
}
