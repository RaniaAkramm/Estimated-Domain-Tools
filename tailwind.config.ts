import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#20281F",
          soft: "#4B5245",
        },
        bg: {
          DEFAULT: "#1B2420",
          deep: "#141B18",
        },
        paper: {
          DEFAULT: "#EFEAD8",
          soft: "#E4DEC8",
        },
        brass: {
          DEFAULT: "#A9803D",
          deep: "#7E5E2A",
        },
        rule: "#C9C2A6",
        stamp: "#8B3A3A",
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "Georgia", "serif"],
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
