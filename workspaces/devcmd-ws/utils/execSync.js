const childProcess = require('child_process')

module.exports = function execSync(...args) {
  // console.log(args)
  childProcess.spawnSync(args[0], args.slice(1), {
    encoding: 'utf-8',
    stdio: 'inherit',
  })
}
