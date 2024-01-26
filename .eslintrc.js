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
    "react/prop-types": 'off',
    'react/no-array-index-key': 'off',  // 배열 내부 요소 고유한 키 없어서 각 요소 추적 어려움 무시
    'import/prefer-default-export': 'off',
    "no-alert": "off",
    "camelcase": "off",
  },
};
