import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ================================
         MODERN MONOGRAPH COLOR PALETTE
         ================================ */
      colors: {
        // --- Backward-compatible semantic tokens (HSL via CSS vars) ---
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: {
          DEFAULT: "#000000",
          foreground: "hsl(var(--primary-foreground))",
          container: "#1b1b1b",
          fixed: "#e2e2e2",
          "fixed-dim": "#c6c6c6",
        },
        secondary: {
          DEFAULT: "#725b38",
          foreground: "hsl(var(--secondary-foreground))",
          container: "#fedeb1",
          fixed: "#fedeb1",
          "fixed-dim": "#e0c297",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        ring: "hsl(var(--ring))",

        // --- Monograph Direct Colors ---
        "ink-black": "#1C1C1E",
        "alabaster-cream": "#FBF9F5",
        "cream-container": "#F4F0E8",
        "silk-border": "#E4DDD0",
        "bronze-hover": "#9E7D53",
        "slate-taupe": "#686461",

        // Surface scale
        surface: {
          DEFAULT: "#f9f9f9",
          bright: "#f9f9f9",
          dim: "#dadada",
          container: {
            DEFAULT: "#eeeeee",
            low: "#f3f3f3",
            high: "#e8e8e8",
            highest: "#e2e2e2",
            lowest: "#ffffff",
          },
          variant: "#e2e2e2",
          tint: "#5e5e5e",
        },

        // On-surface
        "on-surface": "#1b1b1b",
        "on-surface-variant": "#4c4546",
        "on-background": "#1b1b1b",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "on-error": "#ffffff",
        "on-primary-container": "#848484",
        "on-secondary-container": "#78613d",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#848484",
        "on-primary-fixed": "#1b1b1b",
        "on-primary-fixed-variant": "#474747",
        "on-secondary-fixed": "#281800",
        "on-secondary-fixed-variant": "#584322",
        "on-tertiary-fixed": "#1b1b1b",
        "on-tertiary-fixed-variant": "#474747",
        "on-error-container": "#93000a",

        // Tertiary
        tertiary: {
          DEFAULT: "#000000",
          container: "#1b1b1b",
          fixed: "#e2e2e2",
          "fixed-dim": "#c6c6c6",
        },

        // Inverse
        "inverse-surface": "#303030",
        "inverse-on-surface": "#f1f1f1",
        "inverse-primary": "#c6c6c6",

        // Outline
        outline: "#7e7576",
        "outline-variant": "#cfc4c5",

        // Error
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
      },

      /* ================================
         MONOGRAPH BORDER RADIUS
         Almost-square, editorial aesthetic
         ================================ */
      borderRadius: {
        DEFAULT: "0.125rem",   // 2px
        sm: "0.125rem",        // 2px
        md: "0.125rem",        // 2px (override TW default 6px)
        lg: "0.25rem",         // 4px
        xl: "0.5rem",          // 8px
        "2xl": "0.75rem",      // 12px
        full: "9999px",        // keep pill shape available
      },

      /* ================================
         MONOGRAPH SPACING TOKENS
         ================================ */
      spacing: {
        unit: "4px",
        "gutter-mobile": "16px",
        "gutter-desktop": "32px",
        "margin-mobile": "24px",
        "margin-desktop": "80px",
        "section-gap-sm": "64px",
        "section-gap-lg": "128px",
      },

      /* ================================
         MONOGRAPH TYPOGRAPHY
         Bodoni Moda for display, Hanken Grotesk for body
         ================================ */
      fontFamily: {
        // Semantic type roles
        "display-xl": ["var(--font-display)", "Georgia", "serif"],
        "display-2xl": ["var(--font-display)", "Georgia", "serif"],
        "display-2xl-mobile": ["var(--font-display)", "Georgia", "serif"],
        "headline-lg": ["var(--font-display)", "Georgia", "serif"],
        "label-caps": ["var(--font-body)", "-apple-system", "sans-serif"],
        "body-base": ["var(--font-body)", "-apple-system", "sans-serif"],
        subhead: ["var(--font-body)", "-apple-system", "sans-serif"],
        // Legacy aliases
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "-apple-system", "sans-serif"],
      },

      fontSize: {
        "label-caps": [
          "11px",
          { lineHeight: "1", letterSpacing: "0.2em", fontWeight: "600" },
        ],
        "body-base": [
          "16px",
          { lineHeight: "1.7", letterSpacing: "0", fontWeight: "400" },
        ],
        subhead: [
          "18px",
          { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" },
        ],
        "headline-lg": [
          "36px",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "display-xl": [
          "56px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "display-2xl": [
          "72px",
          { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        "display-2xl-mobile": [
          "44px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
