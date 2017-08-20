import * as Babel from 'babel-standalone'

import findAll from '../utils/findAll'

const RE_REQUIRE = /\brequire\('(.*?)'\)/g

export default class JSRunner {
  constructor(scope) {
    this.scope = scope
  }

  _run_preCompile = async (text, ctx) => {
    text = `
      return (async () => {
        ${text}
      })()
    `

    return text
  }

  _run_compile = async (text) => {
    text = Babel.transform(text, {
      parserOpts: {
        allowReturnOutsideFunction: true,
      },
      generatorOpts: {
        quotes: 'single',
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

  _run_prepareRequire = async (text, ctx) => {
    if (typeof require === 'undefined') {
      let modulesNames = []
      modulesNames = modulesNames.concat(findAll(RE_REQUIRE, text))

      const modules = await Promise.all(modulesNames.map(m => SystemJS.import(m)))
      const mappedModules = {}
      modulesNames.forEach((n, i) => {
        mappedModules[n] = modules[i]
      })

      ctx.require = (n) => mappedModules[n]
    } else {
      ctx.require = require
    }

    return text
  }

  _run_execute = async (text, ctx) => {
    this.scope.set('require', ctx.require)
    const keys = this.scope.keys()
    // console.log(text)
    const fn = new Function(...keys, text)
    return await fn.apply(undefined, this.scope.valuesForKeys(keys))
  }

  compile = async (text, ctx = {}) => {
    text = await this._run_preCompile(text, ctx)
    text = await this._run_compile(text)
    return text
  }

  run = async (text, ctx = {}) => {
    text = await this.compile(text, ctx)
    text = await this._run_prepareRequire(text, ctx)
    const result = await this._run_execute(text, ctx)
    return result
  }
}
