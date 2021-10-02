module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['webpack.*.js'],
  extends: ['airbnb'],
  rules: {
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
