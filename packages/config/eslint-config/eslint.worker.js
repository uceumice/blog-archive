/* eslint-env node */
/** @type {import("eslint").ESLint.ConfigData} */
const options = {
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: ["@typescript-eslint"],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        quotes: ["error", "single"],
        camelcase: "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "import/prefer-default-export": "off",
        "@typescript-eslint/camelcase": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/naming-convention": "off"
    },
    overrides: [
        {
            files: [".ts"],
            rules: {
                "@typescript-eslint/explicit-module-boundary-types": "off"
            }
        }
    ],
    settings: {
        "import/resolver": {
            "typescript": {}
        }
    },
    root: true,
};

module.exports = options;