import emailjs from "@emailjs/browser";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export type SubmitInboxResult = { success: true } | { success: false; error: string };

export type ContactPayload = {
  subject: string;
  name: string;
  email: string;
  message: string;
};

async function submitViaWeb3Forms(payload: ContactPayload): Promise<SubmitInboxResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn(
      "[contact] Set VITE_WEB3FORMS_ACCESS_KEY or full EmailJS VITE_* vars (Vercel: Project → Environment Variables).",
    );
    return {
      success: false,
      error: "This form is not available right now. Please reach out via LinkedIn or email.",
    };
  }

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

  const data = (await res.json()) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    return {
      success: false,
      error: data.message ?? "Something went wrong. Please try again later.",
    };
  }

  return { success: true };
}

async function submitViaEmailJS(payload: ContactPayload): Promise<SubmitInboxResult> {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    console.warn(
      "[contact] EmailJS incomplete: set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID on the host (e.g. Vercel env).",
    );
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
  return Boolean(
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
      import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  );
}

/**
 * Sends contact/feedback to your inbox.
 * If EmailJS env vars are set, uses EmailJS (you control the template — no Web3Forms intro).
 * Otherwise falls back to Web3Forms (fixed “Hello / new form submitted” wrapper).
 */
export async function submitToInbox(payload: ContactPayload): Promise<SubmitInboxResult> {
  if (isEmailJSConfigured()) {
    return submitViaEmailJS(payload);
  }

  if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
    return submitViaWeb3Forms(payload);
  }

  console.warn(
    "[contact] No email keys in this build. Vercel: Project → Settings → Environment Variables → add VITE_WEB3FORMS_ACCESS_KEY or the three VITE_EMAILJS_* vars → Redeploy. Check deploy logs for [vite] Contact form: …",
  );
  return {
    success: false,
    error: "This form is not available right now. Please reach out via LinkedIn or email.",
  };
}
