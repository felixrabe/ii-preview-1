import Babel from 'babel-standalone'
// eslint-disable-next-line max-len
import BabelRuntimeAsyncTogenerator from 'babel-runtime/helpers/asyncToGenerator'
import BabelRuntimeRegenerator from 'babel-runtime/regenerator'
import BabelRuntimeCorePromise from 'babel-runtime/core-js/promise'

export default class CommandRunner {
  constructor(context) {
    this.context = context
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

    this.context.set('require', (n) => requireRegistry[n])
    return text
  }

  _run_execute = async (text) => {
    const entries = this.context.getEntries()
    const fn = new Function(...entries.map(([k]) => k), text)
    // eslint-disable-next-line no-unused-vars
    return await fn.apply(undefined, entries.map(([k, v]) => v))
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

  run = async (text, mutableOptions) => {
    text = await this._run_processPrefixes(text, mutableOptions)
    text = await this._run_compile(text)
    return await this._run_execute(text)
  }
}
