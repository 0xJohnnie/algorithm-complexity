import { FlatCompat } from "@eslint/eslintrc";

const eslintConfig = [
  ...new FlatCompat().extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
