import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default [js.configs.recommended,...tseslint.configs.recommended,{ignores:['dist/**','node_modules/**','tests/**/*.js'],languageOptions:{globals:{process:'readonly',console:'readonly',Buffer:'readonly',crypto:'readonly'}},rules:{'@typescript-eslint/no-explicit-any':'warn'}}];
