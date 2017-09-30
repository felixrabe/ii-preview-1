const path = require('path')
const rollup = require('rollup')

const rpCommonjs = require('rollup-plugin-commonjs')
const rpNodeResolve = require('rollup-plugin-node-resolve')
const rpReplace = require('rollup-plugin-replace')
const rpVirtual = require('rollup-plugin-virtual')

const rpImportAlias = require('./rpImportAlias')

module.exports = (stdlib) => async (modName, opts = {}) => {
  let {
    external,
    importAlias,
    modPath,
    namedExports,
    virtual,
    virtualAlias,
  } = opts

  if (!modPath) modPath = modName

  if (namedExports) {
    namedExports = {[modPath]: namedExports}
  }

  const filename = `${modName}.mjs`
  console.log(`Compiling ${filename}...`)

  virtualAlias = virtualAlias || {}
  virtualAlias[filename] = modPath

  if (typeof virtual === 'string')
    virtual = {[filename]: virtual}

  const virt = Object.assign(
    Object.keys(virtualAlias).reduce((virt, k) => {
      const m = JSON.stringify(virtualAlias[k])
      virt[k] = `export * from ${m}\nexport {default} from ${m}\n`
      return virt
    }, Object.create(null)),
    virtual || {},
  )

  const bundle = await rollup.rollup({
    input: filename,
    plugins: [
      rpReplace({ values: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      }}),
      rpVirtual(virt),
      rpImportAlias(importAlias),
      rpNodeResolve(),
      rpCommonjs({
        namedExports,
      }),
    ],
    external,
  })

  await bundle.write({
    file: path.resolve(stdlib, filename),
    format: 'es',
  })
}
