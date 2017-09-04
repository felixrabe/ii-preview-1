import fs from '@node/fs'
import path from '@node/path'
import url from '@node/url'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)

const p = path.join(__dirname, 'package.json')
const packageJson = JSON.parse(fs.readFileSync(p, 'utf-8'))

const builtins = [
  'fs',
  'http',
  'net',
  'os',
  'path',
  'stream',
  'url',
  'util',
]

const nodeMapper = (map, k) => (map[k] = `@node/${k}`, map)

const map = {}
builtins.reduce(nodeMapper, map)
Object.keys(packageJson.dependencies).reduce(nodeMapper, map)

SystemJS.config({
  map
})
