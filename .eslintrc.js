module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off', // 해결할 수 없는 import 경로에 대한 경고 무시
    '@babel/plugin-proposal-private-property-in-object': 'off',
    "react/function-component-definition": 'off',
    "react/prop-types": 'off'
  },
};
