import mkdirp from 'mkdirp'
import os from 'os'
import path from 'path'

const config = {}
export default config

config.port = 10080

config.paths = {}

config.paths.config = path.join(os.homedir(), '.config', 'ii-1')
mkdirp.sync(config.paths.config)

config.paths.sock = path.join(config.paths.config, 'daemon-sock')
config.paths.pid = path.join(config.paths.config, 'daemon-pid')
