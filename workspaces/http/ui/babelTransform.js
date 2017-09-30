const babel = require('babel-core')
const fs = require('fs')
const util = require('util')

const babelTransformFile = util.promisify(babel.transformFile)

module.exports = async (inFile, outFile) => {
  const {code} = await babelTransformFile(inFile, {
    babelrc: false,
    plugins: [
      'transform-react-jsx',
    ],
    resolveModuleSource: (source, filename) => {
      if (source.startsWith('.')) return source
      return `/_s/${source.replace(/\//g, '--')}.mjs`
    },
    sourceMaps: 'inline',
    sourceType: 'module',
  })
  fs.writeFileSync(outFile, code)
}
