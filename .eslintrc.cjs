module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:astro/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'off',
    'no-multiple-empty-lines': 'off',
    'no-tabs': 'off',
    indent: ['error', 2],
    quotes: ['warn', 'single'],
    'jsx-quotes': [2, 'prefer-single'],
    'eol-last': 'off',
    'space-before-function-paren': 'off',
    "no-undef": "off",
    "no-explicit-any": "off"
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        'astro/no-set-html-directive': 'error'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint']
}
