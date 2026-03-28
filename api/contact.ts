import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function json(res: VercelResponse, status: number, body: object) {
  res.status(status).setHeader("Content-Type", "application/json").json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  const body = (typeof req.body === "object" && req.body !== null ? req.body : {}) as Record<
    string,
    unknown
  >;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const subject = String(body.subject ?? "Portfolio message").trim();

  if (!name || !email || !message) {
    return json(res, 400, { success: false, message: "Missing name, email, or message" });
  }

  const web3Key = (process.env.WEB3FORMS_ACCESS_KEY ?? process.env.VITE_WEB3FORMS_ACCESS_KEY ?? "")
    .trim();

  if (web3Key) {
    try {
      const r = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          name: name.slice(0, 500),
          email: email.slice(0, 320),
          message: message.slice(0, 50_000),
          subject: subject.slice(0, 300),
        }),
      });
      const raw = await r.text();
      let data: { success?: boolean; message?: string } = {};
      try {
        if (raw) data = JSON.parse(raw) as { success?: boolean; message?: string };
      } catch {
        /* empty */
      }
      if (r.ok && data.success) {
        return json(res, 200, { success: true });
      }
      console.warn("[api/contact] Web3Forms:", r.status, data.message ?? raw.slice(0, 200));
    } catch (e) {
      console.error("[api/contact] Web3Forms fetch error:", e);
    }
  }

  const resendKey = (process.env.RESEND_API_KEY ?? "").trim();
  const mailTo = (process.env.MAIL_TO ?? "").trim();
  if (resendKey && mailTo) {
    try {
      const resend = new Resend(resendKey);
      const from =
        (process.env.MAIL_FROM ?? "").trim() || "Portfolio <onboarding@resend.dev>";
      const { error } = await resend.emails.send({
        from,
        to: [mailTo],
        replyTo: email,
        subject: subject || `Portfolio: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
      if (error === null) {
        return json(res, 200, { success: true });
      }
      console.error("[api/contact] Resend:", error);
      return json(res, 502, { success: false, message: error.message ?? "Email failed" });
    } catch (e) {
      console.error("[api/contact] Resend error:", e);
      return json(res, 500, {
        success: false,
        message: e instanceof Error ? e.message : "Email failed",
      });
    }
  }

  if (!web3Key && !resendKey) {
    console.error("[api/contact] Set WEB3FORMS_ACCESS_KEY or RESEND_API_KEY + MAIL_TO in Vercel");
  } else {
    console.error("[api/contact] Web3Forms failed; add RESEND_API_KEY + MAIL_TO for backup");
  }

  return json(res, 503, {
    success: false,
    message: "Mail not configured on server",
  });
}
