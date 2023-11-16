/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    boxShadow: {
      modal: "0px 4px 24px rgba(0, 0, 0, 0.05)",
      footer: "0px -1px 34px rgba(0, 0, 0, 0.05)",
      pagination: "inset 1px 0px 0px rgba(198, 209, 221, 0.5)",
    },
    dropShadow: {
      header: [
        "0px 0px 2px rgba(40, 41, 61, 0.04)",
        "0px 4px 8px rgba(96, 97, 112, 0.08)",
      ],
    },
    colors: {
      pink: {
        DEFAULT: "#D436C5",
      },
      blue: {
        DEFAULT: "#307ADF",
      },
      aqua: {
        DEFAULT: "#08C4EC",
      },
      green: {
        DEFAULT: "#03D7AE",
      },
      orange: {
        DEFAULT: "#F26546",
      },
      black: {
        DEFAULT: "#060719",
      },
      white: {
        DEFAULT: "#F1EFF4",
      },
      warning: {
        DEFAULT: "#FFCD1A",
      },
      error: {
        DEFAULT: "#AE2035",
      },
      success: {
        DEFAULT: "#2BEBAE",
      },
    },
    fontSize: {
      xs: ["12px", "18px"],
      sm: ["14px", "21px"],
      base: ["16px", "24px"],
      lg: ["18px", "27px"],
      xl: ["20px", "30px"],
      "2xl": ["24px", "36px"],
      "3xl": ["32px", "48px"],
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },
  plugins: [],
};
