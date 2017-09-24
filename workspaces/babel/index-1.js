const babel = require('babel-core')
const util = require('util')

const babelTransformFile = util.promisify(babel.transformFile)

const importRewriter = (originalPath, callingFileName, options) => {
  if (originalPath.indexOf('/') !== -1) return originalPath

  return `/_n/${originalPath}`
}

module.exports = async (inputPath) => (await babelTransformFile(inputPath, {
  plugins: [
    'transform-react-jsx',
    [require('./babel-plugin-module-rewrite'), {
      replaceFunc: importRewriter,
    }],
  ],
})).code
