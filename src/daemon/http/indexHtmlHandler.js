import fs from 'fs'
import path from 'path'

import appRoot from '../util/appRoot'

const htmlPath = path.join(appRoot, 'src', 'web', 'index.html')
const html = fs.readFileSync(htmlPath, 'utf-8')

const indexHtmlHandler = (req, res) => {
  res.end(html)
}

export default indexHtmlHandler
