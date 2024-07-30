/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nextui } = require('@nextui-org/theme');


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|divider|input|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            foreground: "white",
            DEFAULT: "#00B2A9"
          }
        },
      },
    }
  })],
}