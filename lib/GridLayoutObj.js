import React from 'react'

import Dir from './Dir'
import {isValidElement} from './ReactElement_internal'

export default class Obj extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {cfg, children, className, dir, name, ...props} = this.props
    props.className = className + ' obj-frame'

    return (
      <div {...props}>
        {this.props.name}: {this.repr()}
      </div>
    )
  }

  _repr = (o) => {
    if (typeof o === 'object' && o instanceof Dir) {
      o = React.cloneElement(o.renderObjsForList(), {key: this.props.name})
    } else if (!isValidElement(o)) {
      o = <div key={this.props.name}><em>Opaque object</em></div>
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
