import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./{en,es,bs}/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
