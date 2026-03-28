import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function normalizeBase(raw: string | undefined): string {
  if (!raw || raw === "/") return "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

function pickEnv(env: Record<string, string>, key: string): string {
  const v = env[key] ?? process.env[key];
  return typeof v === "string" ? v.trim() : "";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // "/" for Vercel root and local dev. Set VITE_BASE_PATH=/portfolio/ only for GitHub Pages subpath.
  const base = normalizeBase(env.VITE_BASE_PATH);

  // Bake contact keys into the client bundle from .env and from the host (Vercel injects into process.env at build).
  const VITE_WEB3FORMS_ACCESS_KEY = pickEnv(env, "VITE_WEB3FORMS_ACCESS_KEY");
  const VITE_EMAILJS_PUBLIC_KEY = pickEnv(env, "VITE_EMAILJS_PUBLIC_KEY");
  const VITE_EMAILJS_SERVICE_ID = pickEnv(env, "VITE_EMAILJS_SERVICE_ID");
  const VITE_EMAILJS_TEMPLATE_ID = pickEnv(env, "VITE_EMAILJS_TEMPLATE_ID");

  const hasWeb3Client = Boolean(VITE_WEB3FORMS_ACCESS_KEY.trim());
  const hasServerWeb3 = Boolean(pickEnv(env, "WEB3FORMS_ACCESS_KEY").trim());
  const hasResend =
    Boolean(pickEnv(env, "RESEND_API_KEY").trim()) && Boolean(pickEnv(env, "MAIL_TO").trim());
  const hasEmailJS =
    Boolean(VITE_EMAILJS_PUBLIC_KEY.trim()) &&
    Boolean(VITE_EMAILJS_SERVICE_ID.trim()) &&
    Boolean(VITE_EMAILJS_TEMPLATE_ID.trim());

  if (mode === "production") {
    console.log(
      `[vite] Contact: server API uses WEB3FORMS_ACCESS_KEY=${hasServerWeb3 ? "on" : "off"}, RESEND=${hasResend ? "on" : "off"}; client bundle Web3Forms=${hasWeb3Client ? "on" : "off"}, EmailJS=${hasEmailJS ? "on" : "off"}`,
    );
    if (!hasServerWeb3 && !hasResend && !hasWeb3Client && !hasEmailJS) {
      console.warn(
        "[vite] Add WEB3FORMS_ACCESS_KEY (recommended for /api/contact on Vercel) or RESEND_API_KEY+MAIL_TO, or client VITE_* keys. Redeploy after changing env.",
      );
    }
  }

  return {
    base,
    define: {
      "import.meta.env.VITE_WEB3FORMS_ACCESS_KEY": JSON.stringify(VITE_WEB3FORMS_ACCESS_KEY),
      "import.meta.env.VITE_EMAILJS_PUBLIC_KEY": JSON.stringify(VITE_EMAILJS_PUBLIC_KEY),
      "import.meta.env.VITE_EMAILJS_SERVICE_ID": JSON.stringify(VITE_EMAILJS_SERVICE_ID),
      "import.meta.env.VITE_EMAILJS_TEMPLATE_ID": JSON.stringify(VITE_EMAILJS_TEMPLATE_ID),
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      host: "::",
      port: 8080,
    },
  };
});
