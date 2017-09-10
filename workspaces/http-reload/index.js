const path = require('path')

const log = (...a) => console.log(...a)

const globalVersionKey = '_reloadingHandlerVersion'

const mkInfo = (hnd, version = global[globalVersionKey]) =>
  `...${hnd.slice(-25)} v${version}`

exports = module.exports = function httpReload(hndFn) {
  const hnd = hndFn()
  return function reloadingHandlerWrapper(req, res, next) {
    return exports.origExports.reloadingHandler(hnd, req, res, next)
  }
}

exports.origExports = exports

exports.reloadingHandler = (() => {
  let version = global[globalVersionKey] = (global[globalVersionKey] || 0) + 1
  let isFirstRequest = true
  let isStale = false
  let isReloading = false

  const info = `${version}`

  const waitMS = 1200
  let timeoutId = null
  const extendTimeout = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      isStale = true
    }, waitMS)
  }

  const handlerMap = Object.create(null)
  const prefixes = [__dirname + '/']
  const handlerMapGet = (hnd) => {
    const info = mkInfo(hnd, version)
    if (!(hnd in handlerMap)) {
      handlerMap[hnd] = require(hnd)
      prefixes.push(path.dirname(hnd) + '/')
    }
    return handlerMap[hnd]
  }

  return function reloadingHandler(hnd, req, res, next) {
    const info = mkInfo(hnd, version)
    handler = handlerMapGet(hnd)

    // invariant: isStale === ? && isReloading === ?
    if (isReloading) return handler(req, res, next)
    // invariant: isStale === ? && isReloading === FALSE

    if (!isStale) {
      // invariant: isStale === FALSE && isReloading === false
      extendTimeout()
      if (isFirstRequest) {
        isFirstRequest = false
        // log(`New HTTP handler ready (next: ${info})`)
      }
      return handler(req, res, next)
    }

    // invariant: isStale === TRUE && isReloading === false
    isReloading = true
    // invariant: isStale === true && isReloading === TRUE

    // log(`Reloading HTTP handler (prev: ${info})`)

    Object.keys(require.cache).forEach(k => {
      if (prefixes.some(prefix => k.startsWith(prefix))) {
        delete require.cache[k]
      }
    })

    const newMod = require(__filename)
    newMod.origExports = exports.origExports
    exports.origExports.reloadingHandler = newMod.reloadingHandler
    return exports.origExports.reloadingHandler(hnd, req, res, next)
  }
})()
