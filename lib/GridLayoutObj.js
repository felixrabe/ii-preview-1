import React from 'react'

import Dir from './Dir'
import {isValidElement} from './ReactElement_internal'

export default class Obj extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='grid-layout-obj frame'>
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
