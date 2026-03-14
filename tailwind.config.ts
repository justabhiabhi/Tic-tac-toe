import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.7)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        popIn: 'popIn 180ms ease-out',
      },
      colors: {
        board: '#0f172a',
        panel: '#111827',
        accentX: '#38bdf8',
        accentO: '#f97316',
      },
    },
  },
  plugins: [],
};

export default config;
