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

const _load = (path) => {
  return path in registry ? registry[path] :
    (registry[path] = {path, argsSeen: [], promises: []})
}

self.fetchText = async (path) => await (await fetch(path)).text()

self._loadRel = ({args, base, baseName, exact, path, transform}) => {
  const rObj = _load(resolvePath({base, baseName, exact, path}))
  const i = rObj.argsSeen.indexOf(args)
  if (i !== -1) return rObj.promises[i]
  rObj.argsSeen.push(args)
  const p = (async () => {
    const code = await self.fetchText(rObj.path)
    return transform({...args, code, __moduleName: rObj.path})
  })()
  rObj.promises.push(p)
  return p
}

const transform = async ({code, ...evalArgs}) => {
  code = `return (async () => {'use strict';\n${code}\n;})()`
  evalArgs.load = (path, args = defaultArgs) => self._loadRel(
    {args, baseName: evalArgs.__moduleName, path, transform}
  )
  evalArgs.load.registry = registry
  // minimal UMD support (https://github.com/ForbesLindesay/umd/blob/master/template.js)
  evalArgs.module = {exports: {}}
  evalArgs.exports = evalArgs.module.exports
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
    return self._loadRel({args, base: '', path, transform})
  } else {  // load({path: '/foo/bar', ...})
    return self._loadRel({args: defaultArgs, base: '', transform, ...path})
  }
}
self.load.registry = registry

const meSrc = [...document.getElementsByTagName('script')].pop().src
const mePath = new URL(meSrc).pathname
const indexPath = self.location.pathname

_load(indexPath)
_load(mePath)

})()
