import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function normalizeBase(raw: string | undefined): string {
  if (!raw || raw === "/") return "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // "/" for Vercel root and local dev. Set VITE_BASE_PATH=/portfolio/ only for GitHub Pages subpath.
  const base = normalizeBase(env.VITE_BASE_PATH);

  return {
    base,
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
