import {Transform} from 'stream'

export default class TrimTransform extends Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.trim())
    callback()
  }
}
