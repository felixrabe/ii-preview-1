import yargs from '@node/yargs'

import core from './cli/core'

core(yargs()).then(yargs => yargs.parse(process.argv.slice(2)))
