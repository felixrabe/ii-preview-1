import {Transform} from 'stream'

export default class ToStringTransform extends Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString())
    callback()
  }
}
