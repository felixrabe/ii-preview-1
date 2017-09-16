const stream = require('stream')

module.exports = class TrimTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.trim())
    callback()
  }
}
