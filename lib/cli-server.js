import escapeHtml from '@node/escape-html'
import finalhandler from '@node/finalhandler'
import http from '@node/http'
import path from '@node/path'
import serveStatic from '@node/serve-static'
import url from '@node/url'

import htmlTemplate from './ii-htmlTemplate'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const staticFiles = serveStatic(root, {index: false})

const preEscape = (t) => (
  `<pre>${
    escapeHtml(t)
      .replace(/\n/g, '<br />')
      .replace(/\x20{2}/g, ' &nbsp;')
  }</pre>`
)

const appHandler = (req, res) => {
  res.end(htmlTemplate({iiBody: preEscape(req.url)}))
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
      console.log(`Listening on port ${port}`)
    })
  },
}
