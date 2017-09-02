import stream from '@node/stream'

class TrimTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.trim())
    callback()
  }
}

export const __useDefault = TrimTransform
export default __useDefault
