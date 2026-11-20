/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FDFDFD',
        alabaster: '#F4F4F4',
        obsidian: '#0A0909',
        charcoal: '#141414',
        'charcoal-elevated': '#1D1D1F',
        lime: {
          DEFAULT: '#C6FF00',
          hover: '#D7FF4D',
          dim: '#A3D400',
        },
        muted: {
          DEFAULT: '#707070',
          light: '#A1A1AA',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        editorial: '-0.03em',
      },
      boxShadow: {
        floating: '0 24px 60px -15px rgba(10, 9, 9, 0.22)',
        'floating-dark': '0 28px 70px -15px rgba(0, 0, 0, 0.72)',
        lime: '0 0 28px rgba(198, 255, 0, 0.28)',
      },
      opacity: {
        8: '0.08',
        12: '0.12',
      },
    },
  },
  plugins: [],
};
