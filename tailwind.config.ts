import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // We are telling Tailwind: "Look in these folders starting from the ROOT"
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",  // 👈 This is the critical line
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;