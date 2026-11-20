import tailwind from 'eslint-plugin-tailwindcss';
import babelParser from '@babel/eslint-parser';

// Scope is deliberately narrow: this config enforces L-011 (no arbitrary values,
// i.e. token-only colors and spacing) mechanically. Other tailwind rules stay off
// because Tailwind v4 support in this plugin is partial and custom utilities
// (bg-bg-surface, p-mds-container-lg) would be false positives.
//
// Parser note: typescript-eslint refuses TypeScript 7.0, so we parse TSX with
// @babel/eslint-parser instead. Swap back once typescript-eslint supports TS 7.
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/*.d.ts',
      'apps/docs/tests/**',
      'apps/docs/public/**',
    ],
  },
  {
    files: ['apps/docs/**/*.{ts,tsx}', 'packages/ui/src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [
            '@babel/preset-typescript',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: { tailwindcss: tailwind },
    rules: {
      'tailwindcss/no-arbitrary-value': 'error',
    },
  },
];
