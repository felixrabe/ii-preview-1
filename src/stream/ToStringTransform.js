import stream from 'stream'

export default class ToStringTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString())
    callback()
  }
}
