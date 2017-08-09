import React from 'react'
import I from 'immutable'

import Obj from './Obj'
import {RE_IDENT as _RE_IDENT} from './RegExp'
const RE_IDENT = new RegExp('^' + _RE_IDENT.source + '$')

const DEFAULT_DATA_GRID = {x: 4, y: Infinity, w: 4, h: 2, minW: 2, minH: 2}

export default class Scope {
  constructor({objs, onChange, storage}) {
    this.objs = new I.OrderedMap(objs).set('scope', this).map(this.valToObj)
    this.onChange = onChange
    this.storage = storage
  }

  valToObj = (v, k, cfg = {}) => {
    const dataGrid = DEFAULT_DATA_GRID
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

  renderObjsForLayout = () => (
    this.objs.map(obj => obj[2]).toArray()
  )

  _reactRepr = () => (
    <div className='core-padding'><em>Variable scope</em></div>
  )
}
