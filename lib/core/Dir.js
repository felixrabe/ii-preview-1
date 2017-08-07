import React from 'react'
import I from 'immutable'

import {isValidElement} from './ReactElement_internal'
import {RE_IDENT as _RE_IDENT} from './RegExp'

const RE_IDENT = new RegExp('^' + _RE_IDENT.source + '$')

export default class Dir extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      child: this.props.children,
      objs: new I.OrderedMap(),  // k: [v, cfg]
    }

    this.Obj = this.props.Obj
  }

  get = (k) => {
    if (!this.has(k)) {
      return undefined
    }

    return this.state.objs.get(k)[0]
  }

  getObjElement = (k) => {
    if (!this.has(k)) {
      return undefined
    }

    return this.state.objs.get(k)[2]
  }

  has = (k) => {
    return this.state.objs.has(k)
  }

  set = (k, v, cfg = {}) => {
    if (!k.match(RE_IDENT)) {
      throw new TypeError('Invalid identifier')
    }

    if (this.state.objs.has(k) && this.state.objs.get(k)[1].constant) {
      throw new TypeError('Assignment to constant')
    }

    cfg = new this.Obj.Cfg(cfg)

    const obj = (isValidElement(v) && v.type === this.Obj) ? (
      v = React.cloneElement(v, {key: k, name: k, cfg: cfg})
    ) : (
      <this.Obj key={k} name={k} cfg={cfg} dir={this} {...cfg.propsFor(v)}>
        {v}
      </this.Obj>
    )

    this.setState(prevState => ({objs: prevState.objs.set(k, [v, cfg, obj])}))

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
    if (this.state.objs.has(k)) {
      let num
      [k, num] = this._add_extractNum(k)

      while (this.state.objs.has(k + ++num)) { /* empty */ }

      k = k + num
    }

    return this.set(k, ...args)
  }

  delete = (k) => {
    if (this.state.objs.has(k) && this.state.objs.get(k)[1].constant) {
      throw new TypeError('Deleting constant')
    }

    this.setState(prevState => ({objs: prevState.objs.delete(k)}))
  }

  entries = () => {
    return this.state.objs.mapEntries(([k, vv]) => [k, vv[0]])
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

  renderObjsForChild = () => {
    return this.state.objs.map(o => o[2]).toArray()
  }

  _reactRepr = () => {
    return (
      <ul className='dir'>
        {this.state.objs.keySeq().sort().toArray().map(k => (
          <li key={k}>{k}</li>
        ))}
      </ul>
    )
  }

  render() {
    return React.cloneElement(
      this.state.child,
      {},
      this.renderObjsForChild(),
    )
  }
}
