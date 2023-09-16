import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#f8fafc",
            foreground: "#11181C",
            primary: {
              foreground: "#FFFFFF",
              50: "#fcf1e8",
              100: "#ffedde",
              200: "#ffdbbc",
              300: "#ffc89b",
              400: "#ffb679",
              500: "#ffa458",
              600: "#cc8346",
              700: "#996235",
              800: "#664223",
              900: "#332112",
              DEFAULT: "#FFA458",
            },
            secondary: {
              50: "#e8e1d8",
              100: "#f0e5d8",
              200: "#e1cbb2",
              300: "#d1b08b",
              400: "#c29665",
              500: "#b37c3e",
              600: "#8f6332",
              700: "#6b4a25",
              800: "#483219",
              900: "#24190c",
              DEFAULT: "#b37c3e",
            },
          },
        },
      },
    }),
  ],
};
export default config;
