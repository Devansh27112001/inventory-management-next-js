import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMap = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  const theme: any = {};

  baseColors.forEach((color) => {
    theme[color] = {};
    // Using Object.entries to get the keys and values as [key1, value1], [key2, value2],.... In the forEach, we are destructuring the key and value directly and then we are checking ig the invert parameter is true or false. If it is true we will return the value i.e., the second parameter of array [key,value]. If it is false we will return the key i.e., the first parameter of array [key,value].
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invert ? value : key;
      theme[color][key] = colors[shadeKey];
    });
  });
  return theme;
};

const lightTheme = generateThemeObject(colors, shadeMap);
const darkTheme = generateThemeObject(colors, shadeMap, true);

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
