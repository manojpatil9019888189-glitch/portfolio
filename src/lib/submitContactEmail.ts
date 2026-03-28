import emailjs from "@emailjs/browser";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export type SubmitInboxResult = { success: true } | { success: false; error: string };

export type ContactPayload = {
  subject: string;
  name: string;
  email: string;
  message: string;
};

function envStr(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

async function submitViaWeb3Forms(payload: ContactPayload): Promise<SubmitInboxResult> {
  const accessKey = envStr(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
  if (!accessKey) {
    return {
      success: false,
      error: "This form is not available right now. Please reach out via LinkedIn or email.",
    };
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: payload.subject,
        name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
    });

    const raw = await res.text();
    let data: { success?: boolean; message?: string } = {};
    try {
      data = raw ? (JSON.parse(raw) as { success?: boolean; message?: string }) : {};
    } catch {
      return {
        success: false,
        error: "Could not reach the form service. Please try again or use LinkedIn or email.",
      };
    }

    if (!res.ok || !data.success) {
      const msg = (data.message ?? "").toLowerCase();
      const blocked =
        res.status === 403 ||
        msg.includes("not allowed") ||
        msg.includes("blocked") ||
        msg.includes("domain");

      return {
        success: false,
        error: blocked
          ? "This site URL may need approval for the email form (common on free hosting). Please contact the site owner or use LinkedIn or email."
          : (data.message ?? "Something went wrong. Please try again later."),
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

async function submitViaEmailJS(payload: ContactPayload): Promise<SubmitInboxResult> {
  const publicKey = envStr(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  const serviceId = envStr(import.meta.env.VITE_EMAILJS_SERVICE_ID);
  const templateId = envStr(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);

  if (!publicKey || !serviceId || !templateId) {
    return {
      success: false,
      error: "This form is not available right now. Please reach out via LinkedIn or email.",
    };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        subject: payload.subject,
        from_name: payload.name,
        from_email: payload.email,
        message: payload.message,
      },
      { publicKey },
    );
    return { success: true };
  } catch (err: unknown) {
    const text = err instanceof Error ? err.message : "Something went wrong sending email.";
    return { success: false, error: text };
  }
}

function isEmailJSConfigured(): boolean {
  return (
    Boolean(envStr(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)) &&
    Boolean(envStr(import.meta.env.VITE_EMAILJS_SERVICE_ID)) &&
    Boolean(envStr(import.meta.env.VITE_EMAILJS_TEMPLATE_ID))
  );
}

function isWeb3FormsConfigured(): boolean {
  return Boolean(envStr(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY));
}

/**
 * Sends contact/feedback to your inbox.
 * Prefer Web3Forms when configured. If that fails and EmailJS flags are set, tries EmailJS (helps when Web3Forms blocks *.vercel.app until the domain is approved).
 */
export async function submitToInbox(payload: ContactPayload): Promise<SubmitInboxResult> {
  if (isWeb3FormsConfigured()) {
    const primary = await submitViaWeb3Forms(payload);
    if (primary.success) return primary;
    if (isEmailJSConfigured()) {
      const fallback = await submitViaEmailJS(payload);
      if (fallback.success) return fallback;
    }
    return primary;
  }

  if (isEmailJSConfigured()) {
    return submitViaEmailJS(payload);
  }

  console.warn(
    "[contact] No VITE_WEB3FORMS_ACCESS_KEY or full EmailJS trio at build time. Vercel: Environment Variables → redeploy.",
  );
  return {
    success: false,
    error: "This form is not available right now. Please reach out via LinkedIn or email.",
  };
}
