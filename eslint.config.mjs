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
  // dodajemy plugin:import/typescript, zostawiamy resztę
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:n/recommended",
    "plugin:promise/recommended",
    "prettier",
  ),

  // 1) Ustawienia resolvera TypeScript, żeby aliasy @/... były rozpoznawane
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },

  // 2) W kodzie frontendu wyłączamy reguły pluginu `n`, które dają false-positive
  {
    files: [
      "app/**/*.{ts,tsx,js,jsx}",
      "pages/**/*.{ts,tsx,js,jsx}",
      "components/**/*.{ts,tsx,js,jsx}",
      "src/**/*.{ts,tsx,js,jsx}",
    ],
    rules: {
      "n/no-missing-import": "off",
      "n/no-extraneous-import": "off",
    },
  },

  // reszta Twoich reguł
  {
    rules: {
      "no-undef": "off",
    },
  },
];

export default eslintConfig;