import path from 'path'
import url from 'url'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)
const appRoot = path.join(__dirname, '..', '..', '..')

export const __useDefault = appRoot
export default __useDefault
