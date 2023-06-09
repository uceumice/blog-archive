
/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve('prettier-plugin-astro')],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
    astroAllowShorthand: true,
    printWidth: 140,
    singleQuote: true,
    semi: true
}

// ----
module.exports = config;