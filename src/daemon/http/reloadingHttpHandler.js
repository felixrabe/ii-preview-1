import fs from 'fs'
import path from 'path'
import url from 'url'

// import appHandler from '../web/core-server/appHandler'

const srcPrefix = new url.URL('..', __moduleName)
const waitMS = 500
const reloadedAt = Date.now()
let handlerPromise = null
let fresh = true

export let reloadingHttpHandler = async (req, res) => {
  if (Date.now() - reloadedAt < waitMS) {
    if (fresh) {
      fresh = false
      console.log('New HTTP handler ready')
    }
    // return appHandler(req, res)
    return res.end()
  }

  if (handlerPromise) return (await handlerPromise)(req, res)

  console.log('Reloading HTTP handler...')
  let resolve, reject
  handlerPromise = new Promise((good, bad) => {resolve = good ; reject = bad})

  SystemJS.registry.delete(__moduleName)
  ;[...SystemJS.registry.keys()]
    .filter(k => k.startsWith(srcPrefix))
    .forEach(k => {
      // console.log('  x:', k)
      SystemJS.registry.delete(k)
    })

  const newThisModule = await SystemJS.import(__moduleName)
  reloadingHttpHandler = newThisModule.reloadingHttpHandler
  resolve(reloadingHttpHandler)
  return reloadingHttpHandler(req, res)
}

// export default reloadingHttpHandler
