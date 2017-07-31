export default class Fn {
  constructor({args, body} = {}) {
    this.args = args
    this.body = body
    this._body = `return(${this.body})`
  }

  run = (...args) => {
    return (new Function(...this.args, this._body))(...args)
  }
}
