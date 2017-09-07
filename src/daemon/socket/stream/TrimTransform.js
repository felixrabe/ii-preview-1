import stream from 'stream'

export default class TrimTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.trim())
    callback()
  }
}
