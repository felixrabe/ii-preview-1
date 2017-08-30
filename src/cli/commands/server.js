import server from '../core/server'
import log from '../utils/log'
import yargsPortCheck from '../utils/yargsPortCheck'

const command = {
  command: ['server [dir]', 'serve'],
  describe: 'Start server',
  builder: (yargs) => (
    yargs
      .option({
        port: {
          alias: 'p',
          default: 8080,
          type: 'number',
        },
      })
      .check(yargsPortCheck)
  ),
  handler: async (argv) => {
    server(argv.dir).listen(argv.port, 'localhost', () => {
      log(`Serving '${argv.dir}' on port ${argv.port}`)
    })
  },
}

export const __useDefault = command
export default __useDefault
