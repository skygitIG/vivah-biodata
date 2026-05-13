/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFBF7",
          100: "#FDF8F3",
          200: "#F5EBE0",
          300: "#EAD9C8",
        },
        gold: {
          400: "#D4AF37",
          500: "#C9A227",
          600: "#A88620",
        },
        rose: {
          soft: "#E8D5D0",
          muted: "#C4A59D",
        },
        sage: {
          soft: "#D4E0D7",
          muted: "#9BAF9E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(45, 35, 30, 0.08)",
        glass: "0 8px 32px rgba(45, 35, 30, 0.06)",
        lift: "0 20px 50px -12px rgba(45, 35, 30, 0.12)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 162, 39, 0.12), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(232, 213, 208, 0.35), transparent)",
      },
    },
  },
  plugins: [],
};
