const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
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
          300: "#a5b4fc"
        },
        violet: {
          200: "#ddd6fe"
        }
      },
      animation: {
        aurora: "aurora 60s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          "0%": {
            backgroundPosition: "0% 0%, 0% 0%",
          },
          "25%": {
            backgroundPosition: "50% 25%, 50% 25%",
          },
          "50%": {
            backgroundPosition: "100% 50%, 100% 50%",
          },
          "75%": {
            backgroundPosition: "50% 75%, 50% 75%",
          },
          "100%": {
            backgroundPosition: "0% 100%, 0% 100%",
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
