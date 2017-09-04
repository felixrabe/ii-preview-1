import path from 'path'

import appHandler from '../../web/src/core-server/appHandler'

const webPrefix = path.resolve(__dirname, '../../web/src')
const waitMS = 500
const reloadedAt = Date.now()
let handlerPromise = null
let fresh = true

export let reloadingHttpHandler = async (req, res) => {
  if (Date.now() - reloadedAt < waitMS) {
    if (fresh) {
      fresh = false
      console.log('New HTTP handler ready', Object.keys(require.cache).sort())
    }
    return appHandler(req, res)
  }

  if (handlerPromise) return (await handlerPromise)(req, res)

  console.log('Reloading HTTP handler...', Object.keys(require.cache).sort())
  let resolve, reject
  handlerPromise = new Promise((good, bad) => {resolve = good ; reject = bad})

  delete require.cache[require.resolve(__filename)]
  Object.keys(require.cache).sort()
    .filter(k => k.startsWith(webPrefix))
    .forEach(k => {
      console.log('  x:', k)
      delete require.cache[k]
    })

  reloadingHttpHandler = (await import(__filename)).reloadingHttpHandler
  resolve(reloadingHttpHandler)
  return reloadingHttpHandler(req, res)
}

export default reloadingHttpHandler
