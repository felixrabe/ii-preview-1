import stream from 'stream'

export default class DelayTransform extends stream.Transform {
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
