import React from 'react'

import Dir from './Dir'
import Repr from './Repr'
import {isValidElement} from './ReactElement_internal'

export default class Obj extends React.Component {
  _repr = (o) => {
    if (typeof o === 'object' && o instanceof Dir) {
      o = React.cloneElement(o.renderObjsForList(), {key: this.props.name})
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
