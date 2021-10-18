module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,ts,svelte}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: "jit"
}
