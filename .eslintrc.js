module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'react-native',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        '@react-native-community',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    // 0 = 'off', 1 = 'warn', 2 = 'error'
    rules: {
        'comma-dangle': ['warn', 'only-multiline'],
        'radix': 0,

        // prettier
        'prettier/prettier': [
            'warn',
            {
                arrowParens: "always",
                tabWidth: 4,
                printWidth: 120,
                singleQuote: true,
                trailingComma: "es5",
            }
        ],

        //typescript
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/ban-ts-comment': 0,

        // react
        'react/no-did-mount-set-state': 0,
        'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 1, // Checks effect dependencies

        // react-native
        'react-native/no-inline-styles': 0,
    },
};
