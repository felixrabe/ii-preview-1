/* eslint max-lines: ["error", 280] */

import React from 'react'
import I from 'immutable'

import Icon from './Icon'
import Obj from './Obj'
import {RE_IDENT as _RE_IDENT} from './RegExp'
const RE_IDENT = new RegExp('^' + _RE_IDENT.source + '$')

const DEFAULT_LAYOUT_ITEM = {x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2}

export default class Scope {
  constructor({onChange, storage}) {
    this.onChange = onChange
    this.storage = storage

    this.objs = new I.OrderedMap()
    this.objRefs = {}
    this.moreLayouts = {}
    this.set('scope', this, {constant: true, canHide: false})
    this.set('storage', this.storage, {constant: true, hidden: true})

    this.loadLayout()
  }

  loadLayout = async () => {
    const layout = await this.storage.getItem('layout')
    if (layout) {
      layout.forEach(layoutItem => {
        const k = layoutItem.i
        if (this.objs.has(k)) {
          this.objs.get(k)[1].layout = layoutItem
        } else {
          this.moreLayouts[k] = layoutItem
        }
      })
      this.onChange(this)
    }
  }

  getLayout = () => {
    return this.objs.map(obj => obj[1].layout).toArray()
  }

  onLayoutChange = (layout) => {
    layout = layout.slice()
    layout.forEach(layoutItem => {
      layoutItem = Object.assign({}, layoutItem)
      const k = layoutItem.i
      this.objs.get(k)[1].layout = layoutItem
    })

    layout = this.objs.map(obj => obj[1].layout).toArray()
    this.storage.setItem('layout', layout)
  }

  valToObj = (v, k, cfg = {}) => {
    cfg.layout = Object.assign({}, DEFAULT_LAYOUT_ITEM, cfg.layout)
    cfg = Object.assign({
      constant: false,
      canHide: true,
    }, cfg)
    const obj = (
      <Obj key={k} name={k}
        cfg={cfg} scope={this}
        ref={o => this.receiveObjRef(k, o)}
        unref={() => this.removeObjRef(k)}
      >
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

  getObjRef = (k) => {
    if (!this.objs.has(k)) {
      return undefined
    }

    return this.objRefs[k]
  }

  has = (k) => {
    return this.objs.has(k)
  }

  // eslint-disable-next-line max-statements
  set = (k, v, cfg = {}) => {
    if (!k.match(RE_IDENT)) {
      throw new TypeError('Invalid identifier')
    }

    if (this.objs.has(k) && this.objs.get(k)[1].constant) {
      throw new TypeError('Assignment to constant')
    }

    if (this.objs.has(k)) {
      const oldCfg = this.objs.get(k)[1]
      cfg.layout = Object.assign({}, oldCfg.layout, cfg.layout)
      cfg = Object.assign({}, oldCfg, cfg)
    }

    cfg.layout = Object.assign({}, this.moreLayouts[k], cfg.layout)

    this.objs = this.objs.set(k, this.valToObj(v, k, cfg))
    delete this.moreLayouts[k]
    this.onChange(this)

    return v
  }

  setCfg = (k, cfg) => {
    if (!this.objs.has(k)) {
      return
    }

    const oldCfg = this.objs.get(k)[1]
    cfg.layout = Object.assign({}, oldCfg.layout, cfg.layout)
    this.objs.get(k)[1] = Object.assign({}, oldCfg, cfg)
    this.onChange(this)
    return
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

    this.moreLayouts[k] = this.objs.get(k)[1].layout

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
      this.set(shortName, m, {hidden: true})
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

  receiveObjRef = (k, o) => {
    this.objRefs[k] = o
  }

  removeObjRef = (k) => {
    delete this.objRefs[k]
  }

  renderObjsForLayout = () => {
    const objs = this.objs.filter(obj => !obj[1].hidden).map(obj => {
      return React.cloneElement(obj[2], {
        'data-grid': obj[1].layout,
      })
    }).reverse().toArray()
    return objs
  }

  onShowClick = (k, ev) => {
    ev.preventDefault()
    this.show(k)
  }

  _reactRepr = () => (
    <div>
      <div className='ii-padding' style={{fontSize: '2rem'}}>
        <div className='ii-scope-'>
          <Icon name='cube' />
        </div>
      </div>
      <div className='ii-scope ii-padding-top-bottom'>
        {this.objs.filter(obj => obj[1].hidden).keySeq().sort().map(k => (
          <div className='ii-scope-hidden-obj' key={k}
            onClick={(...a) => this.onShowClick(k, ...a)} title='show'>
            {k}
          </div>
        )).toArray()}
      </div>
    </div>
  )
}
