import yargs from 'yargs'

import commands from './commands'

const buildYargs = async () => (await commands(yargs())).help()

export default buildYargs
