/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Charcoal: "#1b1b1d",
        InkyBlack: "#0a0a0a",
        SlateGray: "#262626",
        BlueForst: "#0095f6",
        ElectricBlue: "#1877F2",
        RaspberryRed: "#ed4956",

        text_3: "#808191",
      },
    },
  },
  plugins: [],
};
