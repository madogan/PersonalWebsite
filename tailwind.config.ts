import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          secondary: 'rgb(var(--color-accent-secondary) / <alpha-value>)',
          cyan: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
        },
        glass: {
          bg: 'var(--glass-bg)',
          border: 'var(--glass-border)',
        },
        // Notebook design system colors
        'cream-paper': '#F9F7F2',
        'obsidian-leather': '#141414',
        'fountain-ink': '#0F172A',
        'grey-metallic':
          '#6B7280' /* Slate grey metallic - replaces deep-gold */,
        'notebook-divider': 'rgb(var(--notebook-divider) / <alpha-value>)',
        'notebook-binding': 'rgb(var(--notebook-binding) / <alpha-value>)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      backdropBlur: {
        sm: 'var(--blur-sm)',
        md: 'var(--blur-md)',
        lg: 'var(--blur-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        // Layered paper shadows for notebook aesthetic
        'paper-sm': '0 1px 3px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.01)',
        'paper-md':
          '0 1px 3px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.01)',
        'paper-lg':
          '0 1px 3px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.02), 0 20px 30px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.01)',
        'paper-xl':
          '0 1px 3px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.02), 0 20px 30px rgba(0,0,0,0.03), 0 30px 40px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.01)',
      },
      fontFamily: {
        sans: ['var(--font-solitreo)', 'Georgia', 'serif'],
        serif: ['var(--font-solitreo)', 'Georgia', 'serif'],
        mono: ['var(--font-solitreo)', 'Georgia', 'serif'],
        solitreo: ['var(--font-solitreo)', 'Georgia', 'serif'],
      },
      rotate: {
        '0.5': '0.5deg',
        '1': '1deg',
        '1.5': '1.5deg',
        '2': '2deg',
        '-0.5': '-0.5deg',
        '-1': '-1deg',
        '-1.5': '-1.5deg',
        '-2': '-2deg',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        glitch: 'glitch 3s infinite',
        'glitch-scan': 'glitchScan 8s linear infinite',
        'scan-line': 'scanLine 2s linear infinite',
        'screen-open': 'screenOpen 1.5s ease-out forwards',
        blink: 'blink 2s infinite',
        'watercolor-paint': 'watercolorPaint 2.5s ease-in-out forwards',
        'liquid-float': 'liquidFloat 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glitch: {
          '0%, 100%': {
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)',
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
            filter: 'hue-rotate(90deg)',
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
            filter: 'hue-rotate(180deg)',
          },
          '60%': {
            transform: 'translate(2px, 2px)',
            filter: 'hue-rotate(270deg)',
          },
          '80%': {
            transform: 'translate(2px, -2px)',
            filter: 'hue-rotate(360deg)',
          },
        },
        glitchScan: {
          '0%': {
            transform: 'translateY(0)',
            opacity: '0.05',
          },
          '50%': {
            transform: 'translateY(50%)',
            opacity: '0.15',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0.05',
          },
        },
        scanLine: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0.5',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0.5',
          },
        },
        screenOpen: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
            filter: 'blur(20px) brightness(0)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(0.95)',
            filter: 'blur(10px) brightness(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
            filter: 'blur(0px) brightness(1)',
          },
        },
        blink: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.3',
          },
        },
        watercolorPaint: {
          '0%': {
            backgroundPosition: '200% 0',
            opacity: '0.3',
            filter: 'blur(2px)',
          },
          '30%': {
            opacity: '0.6',
            filter: 'blur(1.5px)',
          },
          '60%': {
            opacity: '0.9',
            filter: 'blur(0.5px)',
          },
          '100%': {
            backgroundPosition: '0% 0',
            opacity: '1',
            filter: 'blur(0px)',
          },
        },
        liquidFloat: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.5',
          },
          '25%': {
            transform: 'translate(20px, -30px) scale(1.1)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translate(-15px, 20px) scale(0.9)',
            opacity: '0.7',
          },
          '75%': {
            transform: 'translate(30px, 10px) scale(1.05)',
            opacity: '0.6',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
