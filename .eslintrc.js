module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react', 'react-native'],
    extends: [
        'eslint:recommended',
        '@react-native-community',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    rules: {
        'comma-dangle': ['warn', 'only-multiline'],
        radix: 0,
        // Prettier
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'always',
                bracketSpacing: true,
                singleQuote: true,
                trailingComma: 'all',
                tabWidth: 4,
                printWidth: 120,
            },
        ],
        // Typescript
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/ban-types': 1,
    },
};
