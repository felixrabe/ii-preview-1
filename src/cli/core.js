import path from '@node/path'

import cliCommands from './commands'

const core = yargs =>
  cliCommands(yargs)
    .then(yargs => yargs
      .env('II')
      .option('dir', {
        alias: 'd',
        default: '.',
        coerce: path.resolve,
        demandOption: true,
      })
      .strict()
      .help().alias('help', 'h')
      .version()
    )

export const __useDefault = core
export default __useDefault
