import path from 'path';
import eslint from '@eslint/js';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
      
        document: 'readonly',
        window: 'readonly',
      
        browser: true,
        es6: true
      }
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
      import: eslintPluginImport,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettier
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error', 
        { 
          argsIgnorePattern: '^_',  // Игнорировать переменные, начинающиеся с _
          varsIgnorePattern: '^_' 
        }
      ],
      'no-undef': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc' },
          pathGroups: [
            {
              pattern: './**/*.scss',
              group: 'sibling',
              position: 'after'
            }
          ]
        }
      ]
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.scss', '.svg', '.png', '.jpg']
      },
      'import/resolver': {
        typescript: {
          project: path.resolve('./tsconfig.app.json')
        }
      },
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      react: { version: 'detect' }
    }
  },
  { ignores: ['node_modules'] }
];