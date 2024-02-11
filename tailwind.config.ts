import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill,minmax(70px,1fr))",
      },
    },
  },
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "6px",
          medium: "6px",
          large: "6px",
        },
      },
      themes: {
        dark: {
          colors: {
            // background: "#27272a",
            content1: "#0f0f0f",
            danger: {
              400: "#f87171",
              500: "#ef4444",
            },
          },
        },
      },
    }),
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
  darkMode: "class",
};
export default config;
