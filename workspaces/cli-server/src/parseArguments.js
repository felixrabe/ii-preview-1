const fs = require('fs')
const path = require('path')

const scriptPathMissingError = new Error('Script path argument required.')
const doesNotExist = (p) => new Error(`No such file: '${p}'.`)

module.exports = () => {
  const args = []
  const opts = {}
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      opts[arg.slice(2)] = true
    } else {
      args.push(arg)
    }
  })

  if (args.length < 1) throw scriptPathMissingError
  const scriptPath = path.resolve(args.shift())
  if (!fs.existsSync(scriptPath)) throw doesNotExist(scriptPath)

  const sockPath = scriptPath.replace(/\.js$/, '') + '.sock'

  return {scriptPath, sockPath, opts, args}
}
