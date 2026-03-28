/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Vite public path; default `/`. Set `/portfolio/` only for subpath deploys. */
  readonly VITE_BASE_PATH?: string;
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** https://www.emailjs.com — use when you want full control over email body (no Web3Forms intro). */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
