const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')

const config = module.exports = {}

config.httpHost = 'localhost'
config.httpPort = 10080

config.paths = {}

config.paths.config = path.join(os.homedir(), '.config', 'ii-1-daemon')
mkdirp.sync(config.paths.config)

config.paths.sock = path.join(config.paths.config, 'sock')
config.paths.pid = path.join(config.paths.config, 'pid')
