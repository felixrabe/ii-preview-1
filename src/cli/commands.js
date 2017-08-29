// Rationale: yargs.commandDir does not work with SystemJS :(

import fs from '@node/fs'
import path from '@node/path'
import url from '@node/url'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)

const cmdDirBasename = 'commands'

const cmdPs = fs.readdirSync(path.join(__dirname, cmdDirBasename)).sort()
  .map(n => `./${cmdDirBasename}/${n.replace(/\.js$/, '')}`)
  .map(n => SystemJS.import(n, __moduleName))

const cliCommands = async (yargs) => (
  (await Promise.all(cmdPs)).reduce((yargs, m) => yargs.command(m), yargs)
)

export const __useDefault = cliCommands
export default __useDefault
