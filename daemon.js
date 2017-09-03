#!/usr/bin/env node

const babelRegister = require('babel-register').default

babelRegister({
  presets: [
    [ 'env', {targets: {node: 'current'}} ]
  ],
  plugins: [
    'transform-react-jsx',
  ],
})

require = require('@std/esm')(module)
module.exports = require('./src/daemon').default
