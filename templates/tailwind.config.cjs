const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./src/**/*.html', './src/**/*.svelte',],
    darkMode: false,
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
