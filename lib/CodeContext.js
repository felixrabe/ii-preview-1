class Blocks {
  constructor(blocks) {
    this.blocks = blocks
  }
}

export default class CodeContext {
  constructor(app) {
    this.app = app
  }

  createContext = () => {
    return {
      blocks: new Blocks(this.app.blocks),
      later: (v, ms) => new Promise(r => setTimeout(() => r(v), ms)),
    }
  }

  run = async (text) => {
    text = `
      'use strict';
      ${text}
    `
    const context = this.createContext()
    const contextKeys = Object.keys(context)
    const contextValues = contextKeys.map(k => context[k])
    const fn = new Function(...contextKeys, text)
    return await fn.apply(undefined, contextValues)
  }
}
