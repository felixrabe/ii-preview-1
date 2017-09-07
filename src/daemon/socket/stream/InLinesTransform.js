import stream from 'stream'

export default class InLinesTransform extends stream.Transform {
  constructor() {
    super()
    this.buffer = ''
  }

  processBuffer() {
    for (let i; i = this.buffer.indexOf('\n'), i !== -1;) {
      this.push(this.buffer.slice(0, i + 1))
      this.buffer = this.buffer.slice(i + 1)
    }
  }

  _transform(chunk, encoding, callback) {
    const string = chunk.toString()
    this.buffer += string
    this.processBuffer()
    callback()
  }

  _final(callback) {
    this.processBuffer()
    if (this.buffer) this.push(this.buffer)
    this.buffer = ''
    callback()
  }
}
