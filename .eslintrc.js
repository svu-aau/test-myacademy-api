module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  rules: {
    'react/prop-types': 0,
    'react/jsx-no-target-blank': 0,
    'no-console': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.13.1'
    }
  }
};
