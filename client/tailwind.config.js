module.exports = {
  purge: [
    './public/**/*.{html,css}',
    './src/**/*.svelte',
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
