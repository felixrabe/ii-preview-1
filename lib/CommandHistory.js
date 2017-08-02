export default class CommandHistory {
  constructor() {
    this._history = []
    this._pos = this._history.length
  }

  down = () => {
    this._pos = Math.min(this._pos + 1, this._history.length)
    return this.get()
  }

  get = () => {
    return this._history[this._pos] || ''
  }

  push = (cmd) => {
    if (cmd !== this._history[this._history.length - 1]) {
      this._history.push(cmd)
    }
    this._pos = this._history.length
  }

  up = () => {
    this._pos = Math.max(this._pos - 1, 0)
    return this.get()
  }
}
