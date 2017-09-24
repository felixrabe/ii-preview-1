const stream = require('stream')

module.exports = class DebugTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
    this.push('D>\n')
  }

  _write(chunk, encoding, callback) {
    if (chunk instanceof Buffer) chunk = chunk.toString()
    chunk = JSON.stringify(chunk)
    this.push(`D ${chunk} ${encoding}\n`)
    callback()
  }

  _final(callback) {
    this.push('D<\n')
    callback()
  }
}
