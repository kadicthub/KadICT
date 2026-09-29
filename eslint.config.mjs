import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Same rule as KAD Learn: colours come from the shared design tokens
// (src/styles/globals.css), never from raw palette classes or hex values.
const bannedColorClasses =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke)-(?:slate|gray|zinc|neutral|stone|white|black)(?:-\d{2,3})?\b|\[#[0-9a-fA-F]{3,8}\]/;

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: `JSXAttribute[name.name='className'] Literal[value=${bannedColorClasses}]`,
          message:
            'Use design tokens (bg-background, text-foreground, ...) not raw palette classes.',
        },
        {
          selector: `JSXAttribute[name.name='className'] TemplateElement[value.raw=${bannedColorClasses}]`,
          message: 'Use design tokens, not raw palette classes.',
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'next-env.d.ts', 'coverage/**']),
]);
