import { fileURLToPath } from "url";
import { dirname } from "path";
import globals from "globals";
import baseConfig from "@splitrova/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  ...baseConfig,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    ignores: [
      "next-env.d.ts",
      ".next/**",
      "*.config.mjs",
      "*.config.js",
      "*.config.ts",
    ],
  },
];
