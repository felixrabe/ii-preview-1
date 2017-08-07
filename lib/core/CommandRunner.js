import Babel from 'babel-standalone'
// eslint-disable-next-line max-len
import BabelRtCObjectKeys from 'babel-runtime/core-js/object/keys'
import BabelRtCPromise from 'babel-runtime/core-js/promise'
import BabelRtHAsyncToGenerator from 'babel-runtime/helpers/asyncToGenerator'
import BabelRtHTypeof from 'babel-runtime/helpers/typeof'
import BabelRtRegenerator from 'babel-runtime/regenerator'

import {RE_IDENT} from './RegExp'

const CONTEXT_REQUIRE_REGISTRY = {
  'babel-runtime/core-js/object/keys': BabelRtCObjectKeys,
  'babel-runtime/core-js/promise': BabelRtCPromise,
  'babel-runtime/helpers/asyncToGenerator': BabelRtHAsyncToGenerator,
  'babel-runtime/helpers/typeof': BabelRtHTypeof,
  'babel-runtime/regenerator': BabelRtRegenerator,
}

const CONTEXT_REQUIRE = (n) => CONTEXT_REQUIRE_REGISTRY[n]

const ma = (pattern, cb) => {  // matcher
  const re = new RegExp(
    '^' + pattern.map(p => ({
      // patterns with at least 2 chars produce a match group
      '++': '(.+)',
      '**': '(.*)',
      'id': '(' + RE_IDENT.source + ')',
      '.': '\\.',
      ' ': '\\s+',
      '': '\\s*',
    }[p] || p)).join('') + '$'
  )

  return (text, ctx) => {
    const match = text.match(re)

    if (match !== null) {
      text = cb(match, ctx)
    }

    return text
  }
}

const matchers = [
  ma(['**', '', '.', ''], (m, ctx) => {
    ctx.mutableOptions.keepCommand = true
    return m[1]
  }),
  ma(['!', '**'], (m, ctx) => {
    ctx.printCompiledCode = true
    return m[1]
  }),
  ma(['', '=', '', '**'], (m, ctx) => {
    ctx.useConsoleLog = true
    return m[1]
  }),
  ma(['', 'id', '', '=', '', '++'], m => `dir.set('${m[1]}', ${m[2]})`),
  ma(['', 'delete', ' ', 'id', ''], m => `dir.delete('${m[1]}')`),
  ma(['', 'import', ' ', 'id', ''], m => `dir.import('${m[1]}')`),
]

export default class CommandRunner {
  constructor(dir) {
    this.dir = dir
  }

  _run_preCompile = async (text, ctx) => {
    matchers.forEach(m => text = m(text, ctx))

    if (ctx.useConsoleLog) {
      text = `
        return Promise.resolve()
          .then(async () => (${text}))
          .then(r => console.log(r))
      `
    } else {
      text = `
        return (async () => {
          ${text}
        })()
      `
    }

    return text
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

  run = async (text, mutableOptions) => {
    const ctx = {
      mutableOptions: mutableOptions,
      printCompiledCode: false,
      useConsoleLog: false,
    }

    text = await this._run_preCompile(text, ctx)
    text = await this._run_compile(text)
    if (ctx.printCompiledCode) {
      return console.log(text)
    } else {
      return await this._run_execute(text)
    }
  }
}
