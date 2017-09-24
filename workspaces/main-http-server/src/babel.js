const babel = require('babel-core')
const util = require('util')

const babelTransformFile = util.promisify(babel.transformFile)

const importRewriter = [require('ii-module-rewriter'), {
  replaceFunc(originalPath, callingFileName, options) {
    if (originalPath.indexOf('/') !== -1) return originalPath
    return `/_ii/${originalPath}`
  }
}]

const babelOpts = {
  plugins: [
    'transform-react-jsx',
    importRewriter,
  ],
}

module.exports = async (filePath) => {
  const {code} = await babelTransformFile(filePath, babelOpts)
  return code
}
