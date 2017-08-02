export default class CommandContext {
  constructor() {
    this._context = {
      context: this,
    }
  }

  dir = () => {
    return Object.keys(this._context).sort()
  }

  import = (shortName, moduleName, key) => {
    return System.import(moduleName)
      .then(m => {
        if (key) m = m[key]
        this._context[shortName] = m
        return m
      })
  }

  run = async (text, mutableOptions) => {
    if (text.startsWith('!')) {
      text = text.slice(1)
      mutableOptions.keepCommand = true
    }

    if (text.startsWith('=')) {
      text = text.slice(1)
      text = `Promise.resolve().then(() => (${text})).then(r => console.log(r))`
    }

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
