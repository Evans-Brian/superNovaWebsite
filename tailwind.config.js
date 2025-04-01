const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6"
        },
        indigo: {
          300: "#a5b4fc",
          500: "#6366f1"
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6"
        },
        purple: {
          500: "rgba(102, 57, 218, 0.7)",
          600: "rgba(88, 28, 211, 0.7)"
        },
        ambient: {
          light: "rgba(180, 180, 255, 0.03)"
        }
      },
      animation: {
        aurora: "aurora 60s ease-in-out infinite",
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": {
            backgroundPosition: "0% 0%, 0% 0%, 0% 0%",
          },
          "25%": {
            backgroundPosition: "50% 25%, 0% 0%, 50% 25%",
          },
          "50%": {
            backgroundPosition: "100% 50%, 0% 0%, 100% 50%",
          },
          "75%": {
            backgroundPosition: "50% 75%, 0% 0%, 50% 75%",
          },
          "100%": {
            backgroundPosition: "0% 100%, 0% 0%, 0% 100%",
          },
        },
        meteor: {
          "0%": { transform: "rotate(0deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(0deg) translateX(-500px)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
