import React from 'react'

import ObjCfg from './ObjCfg'
import Repr from './Repr'
import {isValidElement} from './ReactElement_internal'

export default class Obj extends React.Component {
  static Cfg = ObjCfg

  extractProps = () => {
    const {cfg, children, className, dir, name, ...props} = this.props
    return {cfg, children, className, dir, name, props}
  }

  render() {
    const {className, name, props} = this.extractProps()

    return (
      <div className={className} {...props}>
        {name}: {this.repr()}
      </div>
    )
  }

  _repr = (o) => {
    if (typeof o === 'object' && o.hasOwnProperty('_reactRepr')) {
      o = React.cloneElement(o._reactRepr(), {key: this.props.name})
    } else if (!isValidElement(o)) {
      o = <Repr key={this.props.name} name={this.props.name}>{o}</Repr>
    }

    return o
  }

  repr() {
    if (Array.isArray(this.props.children)) {
      return this.props.children.map(o => this._repr(o))
    } else {
      return this._repr(this.props.children)
    }
  }
}
