import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        ui: ["var(--font-ui)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          50: "#fdf4f0",
          100: "#fbe6dd",
          200: "#f7c9b8",
          300: "#f2a68e",
          400: "#ec7d5e",
          500: "#e65a35",
          600: "#d4432a",
          700: "#b03424",
          800: "#8e2c22",
          900: "#742820",
          950: "#3f120e",
        },
        accent: {
          50: "#f0f5fd",
          100: "#dde8fa",
          200: "#c3d7f7",
          300: "#9abdf1",
          400: "#6a9ae8",
          500: "#477ae0",
          600: "#325ed4",
          700: "#294bc2",
          800: "#273e9e",
          900: "#25387d",
          950: "#1a234d",
        },
      },
    },
  },
  plugins: [],
};

export default config;
