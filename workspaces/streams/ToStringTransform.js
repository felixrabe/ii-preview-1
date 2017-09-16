const stream = require('stream')

module.exports = class ToStringTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString())
    callback()
  }
}
