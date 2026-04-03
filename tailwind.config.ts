import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        parchment: '#F0EAE0',
        bronze: {
          DEFAULT: '#B8956A',
          light: '#C9A870',
          dark: '#8B6840',
        },
        charcoal: '#1E1B17',
        'warm-slate': '#6B6058',
        taupe: '#8B7964',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
}

export default config
