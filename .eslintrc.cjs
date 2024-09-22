/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  // extends: [
  //   "next/core-web-vitals",
  //   "plugin:@typescript-eslint/recommended-type-checked",
  //   "plugin:@typescript-eslint/stylistic-type-checked",
  // ],
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
  // rules: {
  //   // Nonaktifkan aturan tentang `import type`
  //   "@typescript-eslint/consistent-type-imports": "off",

  //   // Izinkan penggunaan `non-null assertion` pada optional chain
  //   "@typescript-eslint/no-non-null-asserted-optional-chain": "off",

  //   // Nonaktifkan preferensi penggunaan `??` alih-alih `||`
  //   "@typescript-eslint/prefer-nullish-coalescing": "off",

  //   // Nonaktifkan error tentang penggunaan `any` yang dianggap tidak aman
  //   "@typescript-eslint/no-unsafe-assignment": "off",

  //   // Nonaktifkan warning tentang penggunaan `<img>` di Next.js
  //   "@next/next/no-img-element": "off",

  //   // Atur agar unused vars diberi peringatan (bukan error) dan abaikan variabel dengan awalan `_`
  //   "@typescript-eslint/no-unused-vars": [
  //     "warn",
  //     {
  //       argsIgnorePattern: "^_", // Abaikan argumen yang tidak digunakan jika diawali `_`
  //       varsIgnorePattern: "^_", // Abaikan variabel yang tidak digunakan jika diawali `_`
  //     },
  //   ],

  //   // Izinkan penggunaan `@ts-ignore` tanpa menggantinya dengan `@ts-expect-error`
  //   "@typescript-eslint/ban-ts-comment": [
  //     "error",
  //     {
  //       "ts-ignore": "allow-with-description", // Izinkan tapi harus ada deskripsi
  //     },
  //   ],

  //   // Aturan lain yang sudah ada tetap sama
  //   "@typescript-eslint/array-type": "off",
  //   "@typescript-eslint/consistent-type-definitions": "off",
  //   "@typescript-eslint/require-await": "off",
  //   "@typescript-eslint/no-misused-promises": [
  //     "error",
  //     {
  //       checksVoidReturn: {
  //         attributes: false,
  //       },
  //     },
  //   ],
  // },
}

module.exports = config
