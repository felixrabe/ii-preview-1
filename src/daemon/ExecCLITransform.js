// import chalk from 'chalk'
import intercept from 'intercept-stdout'
import stream from 'stream'

import buildYargs from './buildYargs'

const yargsPromise = buildYargs().then(y => y.exitProcess(false).wrap(60))

const processArgs = async (obj, logArray) => {
  if (!Array.isArray(obj)) {
    throw new TypeError(`Expected array, got ${typeof obj}`)
  }
  const awaitPs = []
  const wd = obj[0]
  // do not use process.chdir(), as multiple connections might be open
  const args = (await yargsPromise).parse(obj.slice(1), {awaitPs, wd})
  await Promise.all(awaitPs)
}

export default class ExecTransform extends stream.Transform {
  constructor() {
    super({writableObjectMode: true})
  }

  async _transform(chunk, encoding, callback) {
    let res, err
    const cancelIntercept = intercept(
      (stdout) => {
        this.push(stdout)
        return ''
      },
      (stderr) => {
        this.push(stderr)
        return ''
      },
    )
    const logArray = []
    try {
      await processArgs(chunk, logArray)
    } catch (err_) {
      err = err_
      res = JSON.stringify({error: err.name, message: err.message}) + '\n'
    }
    cancelIntercept()
    logArray.forEach(i => console.log(i))
    if (res === null) res = undefined  // push(null) means end
    callback(err, res)
  }
}
