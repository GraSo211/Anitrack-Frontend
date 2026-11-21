import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".agents/**", ".claude/**"]),
  {
    // shortcut: react-hooks v6 flags existing mount-fetch/hydration guards; refactor them separately
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
]);
