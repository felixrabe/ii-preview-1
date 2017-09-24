const fs = require('fs')
const parseUrl = require('parseurl')
const path = require('path')
const querystring = require('querystring')
const stream = require('stream')

const resolver = require('./resolver')

const Module = module.constructor

const appRoot = path.resolve(__dirname, '..', '..')

const globalHeader = (m) => `
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
;
`

const globalFooter = `
;
export {thisModule as default}
`

class AMDTransform extends stream.Transform {
  constructor(modName) {
    super()
    this.push(globalHeader(modName))
  }

  _write(chunk, encoding, callback) {
    this.push(chunk, encoding)
    callback()
  }

  _flush(callback) {
    this.push(globalFooter)
    callback()
  }
}

module.exports = (parentMod) => {
  const resolve = resolver(parentMod)

  return (req, res, next) => {
    const parsed = parseUrl(req)
    const modName = parsed.pathname.slice(1)
    let {modType, modPath, redirect} = resolve(modName)
    if (modType === 'fromQuery') {
      modType = [].concat(querystring.parse(parsed.query)['t'])[0]
    }

    if (redirect) {
      res.writeHead(302, {
        'Location': '/todo/xy.js',
      })
      res.end()
    }

    switch (modType) {
    case 'es':
      res.writeHead(200, {'Content-Type': 'application/javascript'})
      fs.createReadStream(modPath)
        .pipe(res)
      break
    case 'amd':
      res.writeHead(200, {'Content-Type': 'application/javascript'})
      fs.createReadStream(modPath)
        .pipe(new AMDTransform(modName))
        .pipe(res)
      break
    default:
      res.writeHead(500, {'Content-Type': 'application/javascript'})
      res.end(`throw new Error('${JSON.stringify(modType)} modules are not supported')`)
      break
    }
  }
}
