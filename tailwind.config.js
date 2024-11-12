/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      text: "#e5f2f3",
      background: "#0c1e1f",
      primary: "#a1d5da",
      secondary: "#307b82",
      accent: "#5abdc7",
      transparent: "transparent",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
    },
  },
  plugins: [],
};
