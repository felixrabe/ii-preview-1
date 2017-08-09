/* eslint max-lines: ["error", 200] */

import React from 'react'
import I from 'immutable'

import Obj from './Obj'
import {RE_IDENT as _RE_IDENT} from './RegExp'
const RE_IDENT = new RegExp('^' + _RE_IDENT.source + '$')

const DEFAULT_DATA_GRID = {x: 4, y: Infinity, w: 4, h: 2, minW: 2, minH: 2}

export default class Scope {
  constructor({onChange, storage}) {
    this.onChange = onChange
    this.storage = storage

    this.objs = new I.OrderedMap()
    const thisCfg = {constant: true, canHide: false}
    this.set('scope', this, thisCfg)
  }

  valToObj = (v, k, cfg = {}) => {
    const dataGrid = DEFAULT_DATA_GRID
    cfg = Object.assign({constant: false, canHide: true}, cfg)
    const obj = (
      <Obj key={k} name={k} cfg={cfg} scope={this} data-grid={dataGrid}>
        {v}
      </Obj>
    )
    return [v, cfg, obj]
  }

  get = (k) => {
    if (!this.objs.has(k)) {
      return undefined
    }

    return this.objs.get(k)[0]
  }

  getCfg = (k) => {
    if (!this.objs.has(k)) {
      return undefined
    }

    return this.objs.get(k)[1]
  }

  getObjElement = (k) => {
    if (!this.objs.has(k)) {
      return undefined
    }

    return this.objs.get(k)[2]
  }

  has = (k) => {
    return this.objs.has(k)
  }

  set = (k, v, cfg = {}) => {
    if (!k.match(RE_IDENT)) {
      throw new TypeError('Invalid identifier')
    }

    if (this.objs.has(k) && this.objs.get(k)[1].constant) {
      throw new TypeError('Assignment to constant')
    }

    this.objs = this.objs.set(k, this.valToObj(v, k, cfg))
    this.onChange(this)

    return v
  }

  _add_extractNum = (k) => {
    const match = k.match(/^([^0-9]+)([0-9]+)$/)
    if (match === null) {
      return [k, 0]
    } else {
      return [match[1], parseInt(match[2])]
    }
  }

  // like set, but does not overwrite existing values
  add = (k, ...args) => {
    if (this.objs.has(k)) {
      let num
      [k, num] = this._add_extractNum(k)

      while (this.objs.has(k + ++num)) { /* empty */ }

      k = k + num
    }

    return this.set(k, ...args)
  }

  delete = (k) => {
    if (this.objs.has(k) && this.objs.get(k)[1].constant) {
      throw new TypeError('Deleting constant')
    }

    this.objs = this.objs.delete(k)
    this.onChange(this)
  }

  entries = () => {
    return this.objs.mapEntries(([k, vv]) => [k, vv[0]])
  }

  _import = async (moduleName, key) => {
    System.registry.delete(System.resolveSync(moduleName))

    let m = await System.import(moduleName)
    if (key) {
      m = m[key]
    }

    return m
  }

  import = async (shortName, moduleName, key) => {
    if (!shortName.match(RE_IDENT)) {
      [shortName, moduleName, key] = [undefined, shortName, moduleName]
    } else if (typeof moduleName === 'undefined') {
      moduleName = 'lib/user/' + shortName

      if (typeof key === 'undefined') {
        key = 'default'
      }
    }

    const m = await this._import(moduleName, key)

    if (typeof shortName !== 'undefined') {
      this.set(shortName, m)
    }

    return m
  }

  hide = (k) => {
    if (!(this.objs.has(k) && this.objs.get(k)[1].canHide)) {
      return
    }

    this.objs.get(k)[1].hidden = true
    this.onChange(this)
    return
  }

  show = (k) => {
    if (!this.objs.has(k)) {
      return
    }

    delete this.objs.get(k)[1].hidden
    this.onChange(this)
    return
  }

  renderObjsForLayout = () => (
    this.objs.filter(obj => !obj[1].hidden).map(obj => obj[2]).toArray()
  )

  onShowClick = (k, ev) => {
    ev.preventDefault()
    this.show(k)
  }

  _reactRepr = () => (
    <div className='core-scope core-padding-top-bottom'>
      {this.objs.filter(obj => obj[1].hidden).keySeq().sort().map(k => (
        <div className='core-scope-hidden-obj' key={k}
          onClick={(...a) => this.onShowClick(k, ...a)} title='show'>
          {k}
        </div>
      )).toArray()}
    </div>
  )
}
