import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'eslint/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      },
      globals: {
        ...globals.node
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[1].rules
    }
  }
]);
