import Babel from 'babel-standalone'
import BabelRuntimeAsyncTogenerator from 'babel-runtime/helpers/asyncToGenerator'
import BabelRuntimeRegenerator from 'babel-runtime/regenerator'
import BabelRuntimeCorePromise from 'babel-runtime/core-js/promise'

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
    System.registry.delete(await System.resolve('/lib/CommandUtils'))
    this.set('utils', await System.import('/lib/CommandUtils'))

    if (text.startsWith('!')) {
      text = text.slice(1)
      mutableOptions.keepCommand = true
    }

    if (text.startsWith('=')) {
      text = text.slice(1)
      text = `
        return Promise.resolve()
          .then(async () => (${text}))
          .then(r => console.log(r))
      `
    }

    text = Babel.transform(text, {parserOpts: {allowReturnOutsideFunction: true}, presets: ['es2017', 'es2016', 'es2015', 'react'], plugins: ['transform-runtime']}).code

    const requireRegistry = {
      'babel-runtime/core-js/promise': BabelRuntimeCorePromise,
      'babel-runtime/helpers/asyncToGenerator': BabelRuntimeAsyncTogenerator,
      'babel-runtime/regenerator': BabelRuntimeRegenerator,
    }

    this.set('require', (n) => requireRegistry[n])

    const contextKeys = Object.keys(this._context)
    const contextValues = contextKeys.map(k => this._context[k])
    const fn = new Function(...contextKeys, text)
    return await fn.apply(undefined, contextValues)
  }

  set = (name, value) => {
    this._context[name] = value
  }
}
