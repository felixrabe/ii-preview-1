const jscodeshift = require('jscodeshift')

const j = jscodeshift

module.exports = (code) => {
  const i = []

  code = j(code)
    .find(j.ImportDeclaration)
    .forEach(p => {
      i.push(p)
    })
    .toSource()

  return i.map(x => `${x.name} ${x.value.type} ${typeof x.value.type} ${Object.keys(x.value.type)}`).join('\n')
  return code

  // .find(j.ImportDeclaration).forEach(p => {console.log('x')})

  // const i = []
  // code = j(code)
  //   .find(j.ImportStatement)
  //   .forEach(p => {
  //     i.push(p)
  //   })
  //   .toSource()
  // return i.map(x => JSON.stringify(x)).join('\n')
}
