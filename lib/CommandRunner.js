import Babel from 'babel-standalone'
// eslint-disable-next-line max-len
import BabelRuntimeAsyncTogenerator from 'babel-runtime/helpers/asyncToGenerator'
import BabelRuntimeRegenerator from 'babel-runtime/regenerator'
import BabelRuntimeCorePromise from 'babel-runtime/core-js/promise'

const CONTEXT_REQUIRE_REGISTRY = {
  'babel-runtime/core-js/promise': BabelRuntimeCorePromise,
  'babel-runtime/helpers/asyncToGenerator': BabelRuntimeAsyncTogenerator,
  'babel-runtime/regenerator': BabelRuntimeRegenerator,
}

const CONTEXT_REQUIRE = (n) => CONTEXT_REQUIRE_REGISTRY[n]

export default class CommandRunner {
  constructor(dir) {
    this.dir = dir
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
    return text
  }

  _run_execute = async (text) => {
    const entries = this.dir.entries().set('require', CONTEXT_REQUIRE)
    const fn = new Function(...entries.keys(), text)
    return await fn.apply(undefined, entries.toArray())
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
