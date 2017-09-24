#!/usr/bin/env node

const babel = require('.')

const importRewriter = (originalPath, callingFileName, options) => {
  if (originalPath.indexOf('/') !== -1) return originalPath

  return `/_n/${originalPath}`
}

const main = async () => {
  const handler = babel({
    rootPath: __dirname,
    plugins: [
      'transform-react-jsx',
      [require('./babel-plugin-module-rewrite'), {
        replaceFunc: importRewriter,
      }],
    ],
  })

  const res = {
    writeHead() {},
    end(code) { console.log(code) },
  }

  const next = () => {
    console.log('not found')
  }

  await handler({url: './example.js'}, res, next)
  console.log('')
  await handler({url: './example.mjs'}, res, next)
}

main()
