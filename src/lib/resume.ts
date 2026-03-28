/** Served from `public/Manoj-Patil.pdf`. Uses Vite `base` so it works on Vercel and subpath deploys. */
export function getResumePdfHref(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? `${base}Manoj-Patil.pdf` : `${base}/Manoj-Patil.pdf`;
}

export const RESUME_DOWNLOAD_NAME = "Manoj_Patil_Resume.pdf";
