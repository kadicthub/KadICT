/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  semi: true,
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/globals.css',
};

export default config;
