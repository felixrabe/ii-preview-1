import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import url_ from 'url'
import util from 'util'

const readdirPromise = util.promisify(fs.readdir)
const mkdirpPromise = util.promisify(mkdirp)

const analyze = (o) => ({
  type: typeof o,
  keys: Object.keys(o).filter(k => !k.startsWith('_')),
  inspect: util.inspect(o, {depth: 1}),
})

const sandbox = '/tmp/ii-sandbox'

const apiHandler = async ({url}, req, res) => {
  // await new Promise(r => setTimeout(r, 500))
  const absPath = path.resolve(sandbox, '.' + url.pathname)
  let result
  try {
    await mkdirpPromise(absPath)
    result = (await readdirPromise(absPath)).sort()
  } catch (err) {
    result = {error: err.name, message: err.message}
  }

  result = JSON.stringify(result)
  if (url.searchParams.get('as') === 'text') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  } else {
    res.setHeader('Content-Type', 'application/json')
  }
  res.end(result)
}

const apiHandlerFactory = (config) => {
  const base = `http://${config.host}:${config.port}`
  return (req, res) => {
    const url = new url_.URL(req.url, base)
    return apiHandler({base, url}, req, res)
  }
}

export default apiHandlerFactory
