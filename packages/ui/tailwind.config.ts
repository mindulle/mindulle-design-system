import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--mds-color-brand-primary)',
          'primary-hover': 'var(--mds-color-brand-primary-hover)',
          accent: 'var(--mds-color-brand-accent)',
          'accent-hover': 'var(--mds-color-brand-accent-hover)',
          cyan: 'var(--mds-color-brand-cyan)'
        },
        bg: {
          base: 'var(--mds-color-background-base)',
          surface: 'var(--mds-color-background-surface)',
          elevated: 'var(--mds-color-background-elevated)',
        },
        text: {
          primary: 'var(--mds-color-text-primary)',
          secondary: 'var(--mds-color-text-secondary)',
          muted: 'var(--mds-color-text-muted)',
          disabled: 'var(--mds-color-text-disabled)',
          inverse: 'var(--mds-color-text-inverse)',
        },
        border: {
          default: 'var(--mds-color-border-default)',
          subtle: 'var(--mds-color-border-subtle)',
          strong: 'var(--mds-color-border-strong)',
        },
        state: {
          info: 'var(--mds-color-state-info)',
          success: 'var(--mds-color-state-success)',
          warning: 'var(--mds-color-state-warning)',
          danger: 'var(--mds-color-state-danger)',
          'info-bg': 'var(--mds-color-state-info-bg, #e8f1f8)',
          'success-bg': 'var(--mds-color-state-success-bg, #d4edda)',
          'warning-bg': 'var(--mds-color-state-warning-bg, #fff3cd)',
          'danger-bg': 'var(--mds-color-state-danger-bg, #fde8e8)',
          /* v1.7 compat */
          error: 'var(--mds-color-state-danger)',
          'error-bg': 'var(--mds-color-state-danger-bg, #fde8e8)',
        }
      },
      fontFamily: {
        sans: ['var(--mds-font-sans)'],
        serif: ['var(--mds-font-serif)'],
        mono: ['var(--mds-font-mono)'],
      },
      spacing: {
        'mds-gap-xs': 'var(--mds-space-gap-xs)',
        'mds-gap-sm': 'var(--mds-space-gap-sm)',
        'mds-gap-item': 'var(--mds-space-gap-item)',
        'mds-gap-group': 'var(--mds-space-gap-group)',
        'mds-gap-section': 'var(--mds-space-gap-section)',
        'mds-container-sm': 'var(--mds-space-container-sm)',
        'mds-container-md': 'var(--mds-space-container-md)',
        'mds-container-lg': 'var(--mds-space-container-lg)',
        'mds-container-page': 'var(--mds-space-container-page)',
        'mds-element-py': 'var(--mds-space-element-py)',
        'mds-element-px': 'var(--mds-space-element-px)',
      },
      borderRadius: {
        none: 'var(--mds-radius-none)',
        sm: 'var(--mds-radius-sm)',
        base: 'var(--mds-radius-base)',
        md: 'var(--mds-radius-md)',
        lg: 'var(--mds-radius-lg)',
        xl: 'var(--mds-radius-xl)',
        full: 'var(--mds-radius-full)',
      },
      boxShadow: {
        sm: 'var(--mds-shadow-raised)',
        md: 'var(--mds-shadow-floating)',
        focus: 'var(--mds-shadow-focus)',
      },
      opacity: {
        'mds-hover': 'var(--mds-opacity-hover)',
        'mds-pressed': 'var(--mds-opacity-pressed)',
        'mds-disabled': 'var(--mds-opacity-disabled)',
        'mds-overlay': 'var(--mds-opacity-overlay)',
      }
    },
  },
  plugins: [],
}
