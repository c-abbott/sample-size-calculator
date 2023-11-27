import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colors
      colors: {
        // Dark Backgrounds
        dark: {
          900: "#121212", // Very dark (almost black)
          800: "#1a1a1a", // Darker gray
          700: "#222", // Dark gray
        },
        // Text and Accents
        primary: "#f2f2f2", // Very light gray for high contrast text
        accent: "#bcfd49", // Bright red for buttons and important accents

        // Neutral Palette
        gray: {
          300: "#d1d5db", // Light gray for subtle borders
          500: "#6b7280", // Medium gray for less emphasized elements
          700: "#374151", // Darker gray
        },

        slider: {
          track: "#333", // Dark track color
          thumb: "#bcfd49", // Bright thumb color (accent)
        },

        // Feedback Palette
        success: "#10b981", // Green for success messages
        warning: "#facc15", // Yellow for warnings
        error: "#ef4444", // Red for errors
        info: "#3b82f6", // Blue for informational messages
      },

      boxShadow: {
        // Custom shadow for input and slider
        custom: "0px 0px 10px 0px rgba(0, 0, 0, 0.6)",
      },

      // Adding hover state for border color
      borderColor: ({ theme }) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.300", "currentColor"),
        focusWithin: theme("colors.accent", "#bcfd49"), // Focus within state
      }),

      fontFamily: {
        sans: ["Poppins", "sans-serif", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        xs: ['0.75rem', '1rem'],    // 12px, line-height 16px
        sm: ['1rem', '1.5rem'],      // 16px, line-height 24px
        base: ['1.5rem', '2rem'],    // 24px, line-height 32px
        lg: ['2rem', '2.5rem'],      // 32px, line-height 40px
        xl: ['3rem', '3.5rem'],      // 48px, line-height 56px
      },
      

      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },

      // Spacing
      spacing: {
        px: "1px",
        0.5: "0.125rem",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        // ... more as needed ...
      },

      // Line Heights
      lineHeight: {
        tight: 1.2,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
    },
  },
  plugins: [],
};
