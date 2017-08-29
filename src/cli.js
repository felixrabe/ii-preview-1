import path from '@node/path'
import yargs from '@node/yargs'

import cliCommands from './cli/commands'
import yargsCheck from './cli/utils/yargsCheck'

cliCommands(yargs).then(yargs => {
  yargs
    .env('II')
    .option('dir', {
      alias: 'd',
      default: '.',
      coerce: path.resolve,
      demandOption: true,
    })
    .check(yargsCheck)
    .demandCommand()
    .strict()
    .help().alias('help', 'h')
    .version()
    .argv
})
