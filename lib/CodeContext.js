export default class CodeContext {
  constructor() {
    this._context = {
      dir: this.dir,
    }
  }

  dir = () => {
    return Object.keys(this._context).sort()
  }

  run = async (text) => {
    text = `
      'use strict';
      ${text}
    `
    const contextKeys = Object.keys(this._context)
    const contextValues = contextKeys.map(k => this._context[k])
    const fn = new Function(...contextKeys, text)
    return await fn.apply(undefined, contextValues)
  }

  set = (name, value) => {
    this._context[name] = value
  }
}
