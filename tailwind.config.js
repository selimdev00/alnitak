/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          border: 'var(--ink-border)',
          text: 'var(--ink-text)',
          muted: 'var(--ink-muted)',
          subtle: 'var(--ink-subtle)',
        },
        line: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        content: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          press: 'var(--accent-press)',
          weak: 'var(--accent-weak)',
          ink: 'var(--accent-ink)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          press: 'var(--danger-press)',
          weak: 'var(--danger-weak)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        series: {
          1: 'var(--series-1)',
          2: 'var(--series-2)',
          3: 'var(--series-3)',
          4: 'var(--series-4)',
          5: 'var(--series-5)',
        },
      },
      fontFamily: {
        sans: ['Inter Tight Variable', 'system-ui', 'sans-serif'],
        display: ['Fraunces Variable', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
      },
      transitionDuration: {
        fast: '120ms',
        DEFAULT: '220ms',
        slow: '420ms',
      },
    },
  },
  plugins: [],
}
