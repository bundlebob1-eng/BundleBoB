/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        accent: "#b8ff57",
        "accent-dim": "rgba(184,255,87,0.12)",
        accent2: "#57c8ff",
        "bg-dark": "#080808",
        "bg-dark2": "#0f0f0f",
        "bg-dark3": "#161616",
        current: "currentColor",
        transparent: "transparent",
        white: "#ffffff",
        black: "#000000",
        dark: "#1D2144",
        primary: "#b8ff57",
        "body-color": "rgba(242,240,232,0.45)",
        "body-color-dark": "rgba(242,240,232,0.25)",
        "stroke-dark": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(184,255,87,0.12)",
        "glow-lg": "0 0 80px rgba(184,255,87,0.18)",
      },
      screens: {
        xs: "450px",
      },
      spacing: {
        "4.5": "1.125rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
