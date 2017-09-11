(() => {
'use strict'

const defaultArgs = {}

const absPathWithProtocolPrefixes = [
  '://', 'http://', 'https://',
]

const absPathPrefixes = ['/'].concat(absPathWithProtocolPrefixes)

const join = (...pp) => {
  if (pp.length === 2 && pp[0] === '')
    if (absPathWithProtocolPrefixes.find(p => pp[1].startsWith(p)))
      return pp[1]

  const raw = pp.map(p => '/' + p + '/').join('')
    .replace(/\/+/g, '/').split('/').slice(1, -1)

  const result = []

  raw.forEach(p => {
    if (p === '.') {
      // ignore
    } else if (p === '..') {
      result.pop()
    } else {
      result.push(p)
    }
  })

  return '/' + result.join('/')
}

const extRE = /\.(\w+)$/

const resolvePath = ({base, baseName, exact, path}) => {
  if (baseName !== undefined) {
    base = join(baseName).split('/').slice(0, -1).join('/')
  }
  if (absPathPrefixes.find(p => path.startsWith(p))) base = ''
  path = join(base, path)
  if (!exact && !path.match(extRE)) {
    path += '.js'  // default extension: /foo => /foo.js
  }
  return path
}

const registry = Object.create(null)
const requireRegistry = Object.create(null)

const _load = (path, as) => {
  if (as) requireRegistry[as] = path
  return path in registry ? registry[path] :
    (registry[path] = {as, path, argsSeen: [], promises: []})
}

const _unload = ({as, path}) => {
  if (as) delete requireRegistry[as]
  delete registry[path]
}

const errorShownFor = Object.create(null)

// self.fetchText = async (path) => await (await fetch(path)).text()
self.fetchText = async (path) => {
  const res = await fetch(path)
  if (res.status !== 200) {
    if (!(path in errorShownFor)) {
      errorShownFor[path] = true
      const err = new Error(`fetch(${path}) responded with a status of ${res.status}`)
      console.error(err)
      // throw err
    }
  }
  return await res.text()
}

self._loadRel = ({args, as, base, baseName, exact, path, transform}) => {
  const rObj = _load(resolvePath({base, baseName, exact, path}), as)
  const i = rObj.argsSeen.indexOf(args)
  if (i !== -1) return rObj.promises[i]
  rObj.argsSeen.push(args)
  const p = (async () => {
    let result
    try {
      const code = await self.fetchText(rObj.path)
      result = transform({...args, code, __moduleName: rObj.path})
    } catch (err) {
      _unload(rObj)
      // throw err
      // console.error(err)
      return Promise.reject(err)
    }
    // console.log('loadJS:_loadRel:', rObj.path)
    // console.log(fetch(rObj.path))
    // console.log('')
    if (as) {
      result.then(result => rObj.requirable = result)
    }
    return result
  })()
  rObj.promises.push(p)
  return p
}

const require = (m) => {
  if (!(m in requireRegistry)) {
    throw new Error(`Cannot find module '${m}' (use load({path, as}))`)
  }
  const rObj = registry[requireRegistry[m]]
  return rObj.requirable
}

const loadFromModule = (evalArgs) => (path, args = defaultArgs) => {
  if (typeof path === 'string') {  // load('/foo/bar', ...)
    return loadFromModule(evalArgs)({path, args})
  } else {  // load({path: '/foo/bar', ...})
    return self._loadRel(
      {args: defaultArgs, baseName: evalArgs.__moduleName, transform, ...path}
    )
  }
}

const resolveFromModule = (evalArgs) => (path) => typeof path === 'string'
  ? resolveFromModule(evalArgs)({path: path})
  : resolvePath({baseName: evalArgs.__moduleName, ...path})

const loadNodeModule = (path, as) => {
  return self._loadRel({
    args: defaultArgs,
    as: as || path,
    base: '',
    exact: true,
    path: `${nodeModulePrefix}/${path}`,
    transform,
  })
}

const transform = async ({code, ...evalArgs}) => {
  code = `return (async () => {'use strict';\n${code}\n;})()`
  evalArgs.load = loadFromModule(evalArgs)
  // evalArgs.load = (path, args = defaultArgs) => self._loadRel(
  //   {args, baseName: evalArgs.__moduleName, path, transform}
  // )
  evalArgs.load.registry = registry
  evalArgs.load.requireRegistry = requireRegistry
  evalArgs.load.resolve = resolveFromModule(evalArgs)
  evalArgs.loadNodeModule = loadNodeModule
  // minimal UMD support (https://github.com/ForbesLindesay/umd/blob/master/template.js)
  evalArgs.module = {exports: {}}
  evalArgs.exports = evalArgs.module.exports
  evalArgs.require = require
  try {
    const fn = new Function(...Object.keys(evalArgs), code)
    let r = await fn(...Object.values(evalArgs))
    if (typeof r === 'undefined') {
      r = evalArgs.module.exports
    }
    return r
  } catch (err) {
    // console.error(evalArgs.__moduleName)
    throw err
  }
}

self.load = (path, args = defaultArgs) => {
  if (typeof path === 'string') {  // load('/foo/bar', ...)
    return self.load({path, args})
  } else {  // load({path: '/foo/bar', ...})
    return self._loadRel({args: defaultArgs, base: '', transform, ...path})
  }
}
self.load.registry = registry
self.load.requireRegistry = requireRegistry
self.load.resolve = (path) => typeof path === 'string'
  ? self.load.resolve({path: path})
  : resolvePath({base: '', ...path})
self.load.require = require
self.loadNodeModule = loadNodeModule

const meSrc = [...document.getElementsByTagName('script')].pop().src
const mePath = new URL(meSrc).pathname
const nodeModulePrefix = mePath.split('/').slice(0, -2).join('/')
const indexPath = self.location.pathname

_load(indexPath)
_load(mePath)

})()
