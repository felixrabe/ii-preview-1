import connect from '@node/connect'
import path from '@node/path'
import React from '@node/react'
import ReactDOMServer from '@node/react-dom/server'
import { Route, StaticRouter } from '@node/react-router'
import serveStatic from '@node/serve-static'
import url from '@node/url'

import log from './cliLog'
import htmlTemplate from './ii-htmlTemplate'
import {II} from './ii-react-ui'
import {Placeholder} from './ii-reloader'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const iiStaticFiles = serveStatic(root, {index: false})

const iiBody = ReactDOMServer.renderToString(
  <StaticRouter
    context={{}}
  >
    <II />
  </StaticRouter>
)

const appHandler = (req, res) => {
  const context = {}

  const appBody = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Route path="/:path*" component={Placeholder}/>
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    })
  } else {
    res.write(htmlTemplate({appBody, iiBody}))
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
    const {dir, port} = argv

    const staticFiles = serveStatic(dir, {index: false})

    const app = connect()

    app.use(staticFiles)
    app.use('/_ii', iiStaticFiles)
    app.use(appHandler)

    app.listen(port, 'localhost', () => {
      log(`Serving '${dir}' on port ${port}`)
    })
  },
}
