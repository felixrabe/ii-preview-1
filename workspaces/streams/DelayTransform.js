const stream = require('stream')

module.exports = class DelayTransform extends stream.Transform {
  constructor(ms) {
    super({objectMode: true})

    this.ms = ms
  }

  _transform(chunk, encoding, callback) {
    setTimeout(() => {
      callback(null, chunk)
    }, this.ms)
  }
}
