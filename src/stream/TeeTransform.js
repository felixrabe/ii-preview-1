import {Transform} from 'stream'

export default class ToStringTransform extends Transform {
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
