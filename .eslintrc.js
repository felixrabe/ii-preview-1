/* eslint object-curly-newline: ["error", "always"] */
/* eslint object-property-newline: "error" */
/* eslint quote-props: "error" */
/* eslint sort-keys: "error" */

const withReact = true

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': 'eslint:recommended',
  'overrides': [
    {
      'env': {
        'jest': true,
      },
      'files': ['**/*.test.js'],
      'rules': {
        'newline-per-chained-call': ['off'],
      },
    }],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': withReact,
    },
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  'plugins': withReact ? [
    'react',
  ] : [],
  'rules': {
    'array-bracket-spacing': ['error'],
    'array-callback-return': ['error'],
    'arrow-spacing': ['error'],
    'block-scoped-var': ['error'],
    'block-spacing': ['error'],
    'brace-style': ['error'],
    // 'class-methods-use-this': ['error'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error'],
    'complexity': ['error', 5],
    'consistent-return': ['error'],
    'curly': ['error'],
    'dot-location': ['error', 'property'],
    'eol-last': ['error'],
    'eqeqeq': ['error'],
    'func-call-spacing': ['error'],
    'indent': ['error', 2],
    'key-spacing': ['error'],
    'keyword-spacing': ['error'],
    'linebreak-style': ['error', 'unix'],
    'max-len': ['error', {
      'ignoreComments': false,
    }],
    'max-lines': ['error'],
    'max-statements': ['error'],
    'max-statements-per-line': ['error'],
    'new-parens': ['error'],
    'newline-per-chained-call': ['error', {
      'ignoreChainWithDepth': 3,
    }],
    'no-console': ['off'],
    'no-extra-label': ['error'],
    'no-multi-spaces': ['error', {
      'ignoreEOLComments': true,
    }],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxBOF': 0,
      'maxEOF': 0,
    }],
    'no-trailing-spaces': ['error'],
    'no-warning-comments': ['warn'],
    'no-whitespace-before-property': ['error'],
    'no-with': ['error'],
    'operator-linebreak': ['error', 'none'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': ['error', /* eslint-disable sort-keys */
      {
        'blankLine': 'always',
        'prev': 'block-like',
        'next': '*',
      }, {
        'blankLine': 'always',
        'prev': 'block',
        'next': '*',
      }, {
        'blankLine': 'always',
        'prev': 'class',
        'next': '*',
      }],
    /* eslint-enable sort-keys */
    'quotes': ['error', 'single'],
    'react/jsx-uses-react': [withReact ? 'error' : 'off'],
    'react/jsx-uses-vars': [withReact ? 'error' : 'off'],
    'semi': ['error', 'never'],
    'semi-spacing': ['error'],
    'semi-style': ['error'],
    'space-before-blocks': ['error'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'asyncArrow': 'always',
      'named': 'never',
    }],
    'space-in-parens': ['error'],
    'space-infix-ops': ['error'],
    'space-unary-ops': ['error'],
    'spaced-comment': ['error', 'always', {
      'block': {
        'balanced': true,
      },
    }],
    'strict': ['off'],  // babel-eslint
    'yoda': ['error'],
  },
}
