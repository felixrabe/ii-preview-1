import crypto from 'crypto'

export default class Str {
  constructor(s) {
    this._string = s
    this._hash = null
  }

  hash() {
    if (this._hash) {
      return this._hash
    }

    const hash = crypto.createHash('sha256')
    hash.update(this._string)
    return this._hash = hash.digest('hex')
  }
}
