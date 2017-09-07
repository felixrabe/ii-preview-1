import fs from 'fs'
import path from 'path'

import appRoot from '../util/appRoot'

const htmlPath = path.join(appRoot, 'src', 'web-core', 'index.html')
const html = fs.readFileSync(htmlPath, 'utf-8')

const appHandler = (req, res) => {
  res.end(html)
}

export default appHandler
