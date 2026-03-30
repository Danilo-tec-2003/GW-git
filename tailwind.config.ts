import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gw: {
          blue:    '#0055A4',
          navy:    '#002D6B',
          sky:     '#1A7FD4',
          green:   '#00C853',
          red:     '#FF1744',
          gold:    '#FFD700',
          silver:  '#C0C0C0',
          bronze:  '#CD7F32',
          dark:    '#060D1F',
          surface: '#0D1B35',
          card:    '#122040',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        body:    ['var(--font-body)', 'system-ui'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'timer-drain': 'timer-drain linear forwards',
        'pulse-fast':  'pulse 0.6s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':       'float 6s ease-in-out infinite',
        'truck':       'truck 18s linear infinite',
        'branch':      'branch-draw 2s ease-out forwards',
      },
      keyframes: {
        'timer-drain': {
          from: { width: '100%' },
          to:   { width: '0%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        truck: {
          from: { transform: 'translateX(-200px)' },
          to:   { transform: 'translateX(110vw)' },
        },
        'branch-draw': {
          from: { 'stroke-dashoffset': '200' },
          to:   { 'stroke-dashoffset': '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
