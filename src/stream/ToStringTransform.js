import stream from '@node/stream'

class ToStringTransform extends stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString())
    callback()
  }
}

export const __useDefault = ToStringTransform
export default __useDefault
