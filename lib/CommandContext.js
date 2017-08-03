import Babel from 'babel-standalone'
// eslint-disable-next-line max-len
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
        if (key) {
          m = m[key]
        }

        this._context[shortName] = m
        return m
      })
  }

  _run_compile = async (text) => {
    text = Babel.transform(text, {
      parserOpts: {
        allowReturnOutsideFunction: true,
      },
      presets: [
        'es2017',
        'es2016',
        'es2015',
        'react',
      ],
      plugins: [
        'transform-runtime',
      ]}
    ).code

    const requireRegistry = {
      'babel-runtime/core-js/promise': BabelRuntimeCorePromise,
      'babel-runtime/helpers/asyncToGenerator': BabelRuntimeAsyncTogenerator,
      'babel-runtime/regenerator': BabelRuntimeRegenerator,
    }

    this.set('require', (n) => requireRegistry[n])
    return text
  }

  _run_execute = async (text) => {
    const contextKeys = Object.keys(this._context)
    const contextValues = contextKeys.map(k => this._context[k])
    const fn = new Function(...contextKeys, text)
    return await fn.apply(undefined, contextValues)
  }

  _run_processPrefixes = async (text, mutableOptions) => {
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

    return text
  }

  _run_setupCommandUtils = async () => {
    System.registry.delete(await System.resolve('/lib/CommandUtils'))
    this.set('utils', await System.import('/lib/CommandUtils'))
  }

  run = async (text, mutableOptions) => {
    await this._run_setupCommandUtils()
    text = await this._run_processPrefixes(text, mutableOptions)
    text = await this._run_compile(text)
    return await this._run_execute(text)
  }

  set = (name, value) => {
    this._context[name] = value
  }
}
