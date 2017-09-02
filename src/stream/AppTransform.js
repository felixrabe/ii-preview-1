import stream from '@node/stream'
import yargs from '@node/yargs'

import core from '../cli/core'

const makeYargs = async () => {
  return (await core(yargs())).command('*').exitProcess(false)
}

class AppTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  async _transform(chunk, encoding, callback) {
    let res, err
    try {
      res = (await makeYargs()).parse(chunk)
    } catch (err_) {
      err = err_
      res = {error: err.name, message: err.message}
    }
    if (res === null) res = undefined  // push(null) means end
    this.push(res)
    callback(err)
  }
}

export const __useDefault = AppTransform
export default __useDefault
