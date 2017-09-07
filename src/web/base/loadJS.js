(() => {
'use strict'

const defaultArgs = {}

const join = (...pp) => {
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

const resolvePath = ({base, baseName, path}) => {
  if (baseName !== undefined) {
    base = join(baseName).split('/').slice(0, -1).join('/')
  }
  if (path.startsWith('/')) base = ''  // absolute path
  path = join(base, path)
  if (!path.match(extRE)) {
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

self._loadRel = ({args, base, baseName, path, transform}) => {
  const rObj = _load(resolvePath({base, baseName, path}))
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
// self._loadRel.registry = registry

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

self.load = (path, args = defaultArgs) => self._loadRel(
  {args, base: '', path, transform}
)
self.load.registry = registry

const meSrc = [...document.getElementsByTagName('script')].pop().src
const mePath = new URL(meSrc).pathname
const indexPath = new URL('../index.html', meSrc).pathname

_load(indexPath)
_load(mePath)

const ld = (path) => self._loadRel({baseName: mePath, path, transform})

})()
