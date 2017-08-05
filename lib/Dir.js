import React from 'react'
import I from 'immutable'

export default class Dir extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      child: this.props.children,
      objs: new I.OrderedMap(),  // k: [v, cfg]
    }
  }

  set = (k, v, cfg = {canDelete: true}) => {
    this.setState(prevState => ({objs: prevState.objs.set(k, [v, cfg])}))
  }

  delete = (k) => {
    if (!this.state.objs.get(k)[1].canDelete) {
      return
    }

    this.setState(prevState => ({objs: prevState.objs.delete(k)}))
  }

  renderObjsForChild = () => {
    const Obj = this.props.Obj
    const objs = this.state.objs.map(([v], k) => (
      <Obj key={k} name={k}>{v}</Obj>
    )).toArray()
    return objs
  }

  renderObjsForList = () => {
    const objs = this.state.objs.map((_v, k) => (
      <li key={k}>{k}</li>
    )).toArray()
    return <ul>{objs}</ul>
  }

  render() {
    return React.cloneElement(
      this.state.child,
      {},
      this.renderObjsForChild(),
    )
  }
}
