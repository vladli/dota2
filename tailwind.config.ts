import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            // background: "#27272a",
          },
        },
      },
    }),
  ],
  darkMode: "class",
};
export default config;
