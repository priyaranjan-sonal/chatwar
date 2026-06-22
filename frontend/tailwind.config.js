import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prsBlue:     "#0064E0",
        prsNavy:     "#0054BD",
        prsSky:      "#4D94ED",
        prsWhite:    "#ffffff",
        prsBlack:    "#0C1014",
        prsCharcoal: "#141A21",
        prsGraphite: "#1A2129",
        prsSlate:    "#252B33",
        prsSilver:   "#8B949E",
        prsSnow:     "#E6EDF3",
        prsGray:     "#9BA4AE",
        prsRed:      "#ef4444",
        prsYellow:   "#F5C542",
        prsGreen:    "#22c55e",
        prsAmber:    "#f59e0b",
        prsRose:     "#f87171",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        chatwar: {
          primary: "#0064E0",
          "primary-content": "#ffffff",
          "base-100": "#0C1014",
          "base-200": "#141A21",
          "base-300": "#1A2129",
          neutral: "#252B33",
          "neutral-content": "#E6EDF3",
          info: "#0064E0",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
}
