const fs = require('fs')
const requireLike = require('require-like')
const vm = require('vm')

const createDeepRequire = require('./createDeepRequire')
const {
  cloneAssign,
  createPlainObject,
  flushRequireCache,
  stripShebang,
} = require('./utils')

const runScript = (scriptPath, args, {inStream, outStream, errStream, cwd}) => {
  const sandbox = {
    Buffer,
    clearImmediate,
    clearInterval,
    clearTimeout,
    // console,
    // console: { log() {} },
    console: new console.Console(outStream, errStream),
    process: cloneAssign(process, {
      stdin: inStream,
      stdout: outStream,
      stderr: errStream,
    }),
    require: requireLike(scriptPath),
    setImmediate,
    setInterval,
    setTimeout,
  }

  flushRequireCache()
  const deepRequire = createDeepRequire(sandbox, module)
  deepRequire(scriptPath)
  return deepRequire.cache[deepRequire.resolve(scriptPath)].returnValue
}

module.exports = async (scriptPath, args, {inStream, outStream, errStream, cwd}) => {
  let res, err
  try {
    res = runScript(scriptPath, args, {inStream, outStream, errStream, cwd})
  } catch (err_) {
    err = err_
    res = {error: err.name, message: err.message}
  }

  if (err) {
    console.log('executeScript.js:', 'error')
    errStream.write(JSON.stringify(res) + '\n')
  } else if (res && res.then) {
    console.log('executeScript.js:', 'delayed finish')
    await res
  } else {
    console.log('executeScript.js:', 'instant finish', res)
  }
  console.log('executeScript.js:', 'finish')
}
