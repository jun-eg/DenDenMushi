import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";
import prelinePlugin from "preline/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "mode_modules/preline/dist/*.js",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [formsPlugin, prelinePlugin],
  darkMode: "selector",
} satisfies Config;
