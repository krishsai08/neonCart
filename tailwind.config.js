/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ===== Base surfaces ===== */
        bg: "#FCF6D9", // page background (cream)
        surface: "#FFFFFF", // cards, modals
        border: "#E6DFC6", // subtle separators

        /* ===== Brand ===== */
        primary: "#9CC6DB", // calm blue (brand)
        accent: "#CF4B00", // burnt orange (CTA)
        secondary: "#DDBA7D", // warm gold (highlights)

        /* ===== Text ===== */
        text: {
          main: "#2B2B2B",
          muted: "#6B6B6B",
          subtle: "#9CA3AF",
        },
      },

      boxShadow: {
        soft: "0 1px 6px rgba(0,0,0,0.06)",
        card: "0 4px 16px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
