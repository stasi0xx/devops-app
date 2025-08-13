import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import/recommended",
    "plugin:n/recommended",
    "plugin:promise/recommended",
    "prettier",
  ),
  {
    rules: {
      "no-undef": "off",
    },
  },
];

export default eslintConfig;
