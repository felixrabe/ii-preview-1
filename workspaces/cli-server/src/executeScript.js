const createDeepRequire = require('ii-create-deep-require')

const { cloneAssign } = require('./utils')

module.exports = async (scriptPath, args, options) => {
  const {inStream, outStream, errStream, cwd} = options

  const sandbox = {
    Buffer,
    clearImmediate,
    clearInterval,
    clearTimeout,
    console: new console.Console(outStream, errStream),
    process: cloneAssign(process, {
      argv: [process.argv[0], scriptPath, ...args],
      cwd: () => cwd,
      stdin: inStream,
      stdout: outStream,
      stderr: errStream,
    }),
    setImmediate,
    setInterval,
    setTimeout,
  }
  sandbox.global = sandbox

  const deepRequire = createDeepRequire(sandbox, module, {})
  deepRequire(scriptPath)
  return deepRequire.cache[deepRequire.resolve(scriptPath)].returnValue
}
