const stream = require('stream')

module.exports = class JSONToObjTransform extends stream.Transform {
  constructor() {
    super({readableObjectMode: true})
  }

  _transform(chunk, encoding, callback) {
    const string = chunk.toString()
    let res, err
    try {
      res = JSON.parse(string)
    } catch (err_) {
      err = err_
      res = {error: err.name, message: err.message}
    }
    if (res === null) res = undefined  // push(null) means end
    this.push(res)
    callback(err)
  }
}
