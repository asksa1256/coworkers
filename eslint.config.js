// eslint.config.js

import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier'; // Prettier 충돌 규칙 끄기
import prettierPlugin from 'eslint-plugin-prettier'; // Prettier 규칙 위반 검사
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Prettier 관련 설정은 배열의 마지막에 위치해야 충돌을 방지할 수 있습니다.
export default [
  // 1. 전역 무시 파일 설정 (기존 globalIgnores(['dist']))
  {
    ignores: ['dist'],
  },

  // 2. 기본 ESLint 추천 규칙
  js.configs.recommended,

  // 3. Prettier와 충돌하는 모든 ESLint 규칙 끄기 (MUST BE LAST EXTEND/CONFIG)
  // 이 설정이 다른 모든 규칙을 덮어쓰고 포맷팅 충돌을 방지합니다.
  prettierConfig,

  // 4. TypeScript, React 환경 설정 (files: ['**/*.{ts,tsx}'])
  ...tseslint.configs.recommended, // TS 추천 규칙 및 파서 설정

  {
    files: ['**/*.{ts,tsx,js,jsx}'], // JS/TS 파일에 모두 적용

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },

    languageOptions: {
      // 기존 env 설정 (browser, node)
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      // tseslint가 파서를 설정하므로 parserOptions만 추가
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // React 추천 규칙 통합
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // === 기존 rules 반영 ===
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off', // 기본 no-unused-vars 끄기

      // TS 버전의 no-unused-vars만 사용
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // React Refresh 규칙
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Prettier 규칙 위반 시 경고
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto', // Prettier가 CRLF도 유효한 개행 방식으로 인식하도록 설정
        },
      ],
    },
  },
];
