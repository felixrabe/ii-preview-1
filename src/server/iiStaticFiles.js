import path from '@node/path'
import serveStatic from '@node/serve-static'
import url from '@node/url'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..', '..')
const iiStaticFiles = serveStatic(root, {index: false})

export const __useDefault = iiStaticFiles
export default __useDefault
