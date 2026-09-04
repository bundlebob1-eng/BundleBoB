import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#FFFFFF',
        concrete: '#C9C6BE',
        ink: '#101215',
        hivis: '#FFB800',
        dusk: '#16233A',
      },
      fontFamily: {
        display: ['Anton', 'Archivo', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
