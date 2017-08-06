import React from 'react'
import I from 'immutable'

import GridLayoutObjCfg from './GridLayoutObjCfg'

export default class Dir extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      child: this.props.children,
      objs: new I.OrderedMap(),  // k: [v, cfg]
    }
  }

  set = (k, v, cfg = {}) => {
    if (this.state.objs.has(k) && this.state.objs.get(k)[1].constant) {
      return
    }

    cfg = new GridLayoutObjCfg(cfg)
    this.setState(prevState => ({objs: prevState.objs.set(k, [v, cfg])}))
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
      let [k, num] = this._add_extractNum(k)

      while (this.state.objs.has(k + num)) {
        num++
      }

      k = k + num
    }

    return this.set(k, ...args)
  }

  delete = (k) => {
    if (this.state.objs.get(k)[1].constant) {
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
