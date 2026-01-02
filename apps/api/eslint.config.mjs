import { fileURLToPath } from "url";
import { dirname } from "path";
import globals from "globals";
import baseConfig from "@splitrova/eslint-config";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
];
