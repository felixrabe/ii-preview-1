#!/usr/bin/env node

const path = require('path')
const rollup = require('rollup')

const opts = {
  input: path.resolve(__dirname, '../main-http-server/ui/index.mjs'),
  plugins: [
    babel({
      exclude: 'node_modules/**',
      'plugins': ['syntax-jsx'],
    }),
  ],
}

const main = async () => {
  try {
    await rollup.rollup(opts)
  } catch(err) {
    console.error(err)
  }
}

main()
