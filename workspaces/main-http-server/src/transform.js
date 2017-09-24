const amdHeader = (m) => `
self.__dReg = self.__dReg || Object.create(null)
self.__dRegFns = self.__dRegFns || new Set()
let thisModule
const define = (depNames, factory) => {
  if (!factory) {
    factory = depNames
    depNames = []
  }
  const fn = () => {
    self.__dRegFns.delete(fn)
    const deps = depNames.map(d => self.__dReg[d])
    if (deps.some(d => !d)) {
      return self.__dRegFns.add(fn)
    }
    thisModule = factory(...deps)${m ? `
    self.__dReg[${JSON.stringify(m)}] = thisModule
    self.__dRegFns.forEach(fn => fn())` : ''}
  }
  fn()
}
define.amd = true
`

const amdFooter = `
export {thisModule as default}
`

module.exports = (code, modName, modType) => {
  switch (modType) {
  case 'es':
    return code
  case 'amd':
    return `${amdHeader(modName).trim()};\n${code};\n${amdFooter.trim()}`
  default:
    return `throw new Error('${JSON.stringify(modType)} modules are not supported')`
  }
}
