import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import url_ from 'url'
import util from 'util'

import config from '../config'

const readdirPromise = util.promisify(fs.readdir)
const mkdirpPromise = util.promisify(mkdirp)

const analyze = (o) => ({
  type: typeof o,
  keys: Object.keys(o).filter(k => !k.startsWith('_')),
  inspect: util.inspect(o, {depth: 1}),
})

const sandbox = '/tmp/ii-sandbox'

const base = `http://${config.httpHost}:${config.httpPort}`

const apiHandler = async (req, res) => {
  const url = new url_.URL(req.url, base)
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

export default apiHandler
