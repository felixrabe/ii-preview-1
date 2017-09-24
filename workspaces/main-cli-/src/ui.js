const path = require('path')
const querystring = require('querystring')

const uiPath = path.dirname(require.resolve('ii-ui'))

const importRewriter = (originalPath, callingFileName, options) => {
  if (originalPath.indexOf('/') !== -1) return originalPath
  return `/_ui_n/${originalPath}`
}

module.exports = require('ii-babel')({
  rootPath: uiPath,
  plugins: [
    'transform-react-jsx',
    // [require('./moduleRewriter'), {
    [require('ii-module-rewriter'), {
      replaceFunc: importRewriter,
    }],
  ],
})
