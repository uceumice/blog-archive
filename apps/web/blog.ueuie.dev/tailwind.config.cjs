/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar'), require('daisyui')],
  daisyui: {
    themes: ["black", "light"],
  },
};
