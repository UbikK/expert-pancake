module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'typescript',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                semi: true,
                tabWidth: 4,
                singleQuote: true,
                printWidth: 80,
                embeddedLanguageFormatting: 'auto',
                singleAttributePerLine: true
            }
        ],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off'
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-shadow': ['error'],
                'no-shadow': 'off',
                'no-undef': 'off'
            }
        }
    ]
};
