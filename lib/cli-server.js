import finalhandler from '@node/finalhandler'
import http from '@node/http'
import path from '@node/path'
import React from '@node/react'
import ReactDOMServer from '@node/react-dom/server'
import { StaticRouter } from '@node/react-router'
import serveStatic from '@node/serve-static'
import url from '@node/url'

import log from './cliLog'
import htmlTemplate from './ii-htmlTemplate'
import {II} from './ii-react-ui'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const staticFiles = serveStatic(root, {index: false})

const appHandler = (req, res) => {
  const context = {}

  const iiBody = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <II />
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    })
  } else {
    res.write(htmlTemplate({iiBody}))
  }
  res.end()
}

export default {
  command: ['server [dir]', 'serve'],
  describe: 'Start server',
  builder: (yargs) => (
    yargs
      .option({
        port: {
          alias: 'p',
          default: 8080,
          type: 'number',
        },
      })
      .check((argv) => {
        const {port} = argv
        if (typeof port !== 'number' || Number.isNaN(port)) {
          throw new TypeError('Specified port is not a number')
        }
        return true
      })
  ),
  handler: (argv) => {
    const port = argv.port

    http.createServer((req, res) => {
      staticFiles(req, res, (err) => {
        if (err) return finalhandler(req, res)(err)
        appHandler(req, res)
      })
    }).listen(port, 'localhost', () => {
      log(`Listening on port ${port}`)
    })
  },
}
