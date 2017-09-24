const babel = require('babel-core')
const util = require('util')

const babelTransformFile = util.promisify(babel.transformFile)

const sourceRewriter = (source, filename) => {
  if (source.startsWith('.')) return source
  // if (source.indexOf('/') !== -1) return source
  return `/_ii/${source}`
}

const babelOpts = {
  plugins: [
    'transform-react-jsx',
  ],
  resolveModuleSource: sourceRewriter,
}

module.exports = async (filePath) => {
  const {code} = await babelTransformFile(filePath, babelOpts)
  return code
}
