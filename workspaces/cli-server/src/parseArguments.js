const path = require('path')

const muteStdout = require('./muteStdout')

module.exports = () => {
  if (process.argv.length < 3) throw new Error('Script path argument required.')

  let silent = false
  let scriptPath = process.argv[2]
  let args = process.argv.slice(3)
  if (scriptPath === '--silent') {
    silent = true
    scriptPath = process.argv[3]
    args = process.argv.slice(4)
  }

  scriptPath = path.resolve(scriptPath)
  const sockPath = path.resolve(scriptPath.replace(/\.js$/, '') + '.sock')

  if (silent) {
    muteStdout()
  }

  return {args, scriptPath, sockPath}
}
