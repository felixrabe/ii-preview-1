import React from 'react'
import I from 'immutable'

import ObjCfg from './ObjCfg'

export default class Dir extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      child: this.props.children,
      objs: new I.OrderedMap(),  // k: [v, cfg]
    }
  }

  set = (k, v, cfg = {}) => {
    cfg = new ObjCfg(cfg)
    this.setState(prevState => ({objs: prevState.objs.set(k, [v, cfg])}))
  }

  // like set, but does not overwrite existing values
  add = (k, ...args) => {
    if (this.state.objs.has(k)) {
      const match = k.match(/^([^0-9]+)([0-9]+)$/)
      let num
      if (match === null) {
        num = 1
      } else {
        k = match[1]
        num = parseInt(match[2]) + 1
      }
      while (this.state.objs.has(k + num)) {
        num++
      }
      k = k + num
    }

    return this.set(k, ...args)
  }

  delete = (k) => {
    if (!this.state.objs.get(k)[1].canDelete) {
      return
    }

    this.setState(prevState => ({objs: prevState.objs.delete(k)}))
  }

  entries = () => {
    return this.state.objs.mapEntries(([k, v]) => [k, v[0]])
  }

  import = (shortName, moduleName, key) => {
    if (typeof moduleName === 'undefined') {
      moduleName = 'lib/' + shortName

      if (typeof key === 'undefined') {
        key = 'default'
      }
    }

    return System.import(moduleName)
      .then(m => {
        if (key) {
          m = m[key]
        }

        this.set(shortName, m)
        return m
      })
  }

  renderObjsForChild = () => {
    const Obj = this.props.Obj
    return this.state.objs.map(([v, cfg], k) => (
      <Obj key={k} name={k} cfg={cfg} dir={this}
        data-grid={cfg.gridDataWithDefault(
          {x: 0, y: Infinity, w: 4, h: 3, minW: 2, minH: 2}
        )}
      >
        {v}
      </Obj>
    )).toArray()
  }

  renderObjsForList = () => {
    return (
      <ul>
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
