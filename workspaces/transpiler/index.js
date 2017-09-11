const jsx = require('ii-transpiler-jsx')
const esmMod = require('ii-transpiler-esm-module-specifiers')

const transformers = [jsx, esmMod]

module.exports = (code) => {
  return transformers.reduce((code, tr) => tr(code), code)
}
