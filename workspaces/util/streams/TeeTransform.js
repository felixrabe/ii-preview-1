const stream = require('stream')

module.exports = class ToStringTransform extends stream.Transform {
  constructor(other) {
    super({objectMode: true})

    this.other = other
  }

  _transform(chunk, encoding, callback) {
    this.other.write(chunk)
    this.push(chunk)
    callback()
  }
}
