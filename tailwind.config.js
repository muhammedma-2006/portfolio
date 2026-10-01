/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080c14",
        surface: "#0f1624",
        "surface-card": "#131c2e",
        "surface-elevated": "#19243a",
        accent: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          electric: "#38bdf8",
          glow: "rgba(37, 99, 235, 0.25)"
        },
        muted: "#94a3b8",
        subtle: "#64748b",
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(37, 99, 235, 0.3)',
        'glow-lg': '0 0 40px -10px rgba(56, 189, 248, 0.35)',
        'subtle-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
