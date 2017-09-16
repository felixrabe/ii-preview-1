const stream = require('stream')
const vm = require('vm')

module.exports = class ExecTransform extends stream.Transform {
  constructor() {
    super({readableObjectMode: true})
  }

  _transform(chunk, encoding, callback) {
    const code = chunk.toString()
    let res, err
    try {
      res = vm.runInNewContext(code)
      // res = vm.runInThisContext(code)
    } catch (err_) {
      err = err_
      res = {error: err.name, message: err.message}
    }
    if (res === null) res = undefined  // push(null) means end
    this.push(res)
    callback(err)
  }
}
