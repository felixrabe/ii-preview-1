import React from 'react'
import I from 'immutable'

import {RE_IDENT as _RE_IDENT} from './RegExp'

const RE_IDENT = new RegExp('^' + _RE_IDENT.source + '$')

export default class Dir extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      child: this.props.children,
      objs: new I.OrderedMap(),  // k: [v, cfg]
    }
  }

  get = (k) => {
    return this.state.objs.get(k)[0]
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

    cfg = new this.props.Obj.Cfg(cfg)
    this.setState(prevState => ({objs: prevState.objs.set(k, [v, cfg])}))

    return v
  }

  _add_extractNum = (k) => {
    const match = k.match(/^([^0-9]+)([0-9]+)$/)
    if (match === null) {
      return [k, 1]
    } else {
      return [match[1], parseInt(match[2]) + 1]
    }
  }

  // like set, but does not overwrite existing values
  add = (k, ...args) => {
    if (this.state.objs.has(k)) {
      let num
      [k, num] = this._add_extractNum(k)

      while (this.state.objs.has(k + num)) {
        num++
      }

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
    return this.state.objs.mapEntries(([k, v]) => [k, v[0]])
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
    const Obj = this.props.Obj
    return this.state.objs.map(([v, cfg], k) => (
      <Obj key={k} name={k} cfg={cfg} dir={this} {...cfg.propsFor(v)}>
        {v}
      </Obj>
    )).toArray()
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
